/**
 * http://usejsdoc.org/
 */

// The root URL for the RESTful services

var pageInitialized = false;

var rootURL = "http://localhost:8080/DistSys_HotelRoomReservation_war_exploded/";
//var rootURL = "http://localhost:8080/DistSys_HotelRoom_war_exploded/";
var arrivalDate;
var departureDate;
var roomType;
var givenname;
var surname;

$(document).ready(function () {

        if(pageInitialized) return;
        pageInitialized = true;
        document.getElementById("arrivalDate").valueAsDate = new Date();
        document.getElementById("departureDate").valueAsDate = new Date();

        listRoomTypes();
        adjustVisibilities("reservation");
});

function showBookForm() {
    adjustVisibilities("book");

    $('#availableText').html('The room of type ' + $('#roomType option:selected').text() + " is from " + arrivalDate.getDate() + "." +
        arrivalDate.getMonth() + "." + arrivalDate.getFullYear() + " to " + departureDate.getDate() + "." +
        departureDate.getMonth() + "." + departureDate.getFullYear() + " still available!");
}

function showAlternativesForm() {

    adjustVisibilities("alternatives");

    $('#alternativesText').html('The room of type ' + $('#roomType option:selected').text() + " for the requested period (from "
        + arrivalDate.getDate() + "." +  arrivalDate.getMonth() + "." + arrivalDate.getFullYear() + " to "
        + departureDate.getDate() + "." + departureDate.getMonth() + "." + departureDate.getFullYear() + ") is not available. " +
        "Here are some alternatives:");
}

function goBackToForm() {
    adjustVisibilities("reservation");
}

function showAdminLogin() {
    adjustVisibilities("adminLogin");
}

function login() {

    var pass = document.getElementById('password').value;
    if(pass == "admin") {

        adjustVisibilities("addRooms");
    } else {
        //invalid;

        $("#password").addClass('invalid');
    }
}

function addRoom() {
    var type = document.getElementById('newType').value;
    var amount = document.getElementById('amount').value;
    var price = document.getElementById('price').value;

    $("#newType").removeClass('invalid');
    $("#amount").removeClass('invalid');
    $("#price").removeClass('invalid');

    console.log(amount);
    if(type != "" && amount != "" && price != "") {

        var data = buildRoomUpdateRequest(type, amount, price);
        updateRoomInfosServer(data); //does not work for some reason
    } else {
        if(type == "") {

            $("#newType").addClass('invalid');
        }
        if(amount == "") {

            $("#amount").addClass('invalid');
        }
        if(price == "") {

            $("#price").addClass('invalid');
        }
    }
}

function adjustVisibilities(type) {
    //might seem really silly, but it's not stupid if it works :)
    $("#book-form").removeClass('invisible').addClass('invisible');
    $("#alternatives-form").removeClass('invisible').addClass('invisible');
    $("#reservation-form").removeClass('invisible').addClass('invisible');
    $("#login-form").removeClass('invisible').addClass('invisible');
    $("#add-rooms-form").removeClass('invisible').addClass('invisible');

    switch (type) {
        case "reservation":
            $("#reservation-form").removeClass('invisible');
            $("#arrivalDate").removeClass('invalid');
            $("#departureDate").removeClass('invalid');
            break;
        case "book":
            $("#book-form").removeClass('invisible');
            $("#givenname").removeClass('invalid');
            $("#surname").removeClass('invalid');
            break;
        case "alternatives":
            $("#alternatives-form").removeClass('invisible');
            break;
        case "adminLogin":
            $("#login-form").removeClass('invisible');
            $("#password").removeClass('invalid');
            break;
        case "addRooms":
            $("#add-rooms-form").removeClass('invisible');
            $("#newType").removeClass('invalid');
            $("#amount").removeClass('invalid');
            $("#price").removeClass('invalid');
            break;
    }
}

function checkAvailabilityCommand() {
    arrivalDate = new Date(document.getElementById('arrivalDate').value);
    departureDate = new Date(document.getElementById('departureDate').value);
    roomType = document.getElementById('roomType').value;

    console.log(departureDate);

    if (departureDate < arrivalDate) {
        //invalid
        $("#arrivalDate").addClass('invalid');
        $("#departureDate").addClass('invalid');

    } else {
        // todo load id from room type
        var request = buildAvailabilityRequest("1", arrivalDate.toJSON(), departureDate.toJSON());

        checkAvailabilityServer(request, function (result) {
            if (result.isRoomAvailable) {
                var availableRooms = result.numAvailableRooms;
                console.log("available: ", availableRooms);
                showBookForm();
            } else {
                console.log("not available.");
                var alternatives = result.alternativeRooms;
                console.log(result.alternativeRooms);
                showAlternativesForm();
            }
        });
    }
}

function bookRoomCommand() {
    givenname = document.getElementById('givenname').value;
    surname = document.getElementById('surname').value;

    $("#givenname").removeClass('invalid');
    $("#surname").removeClass('invalid');

    if (givenname != "" && surname != "") {

        var data = buildBookingRequest(roomType, arrivalDate, departureDate, givenname, surname);
        bookRoomServer(data, function(result){});


    } else {
        if (givenname == "") {

            $("#givenname").addClass('invalid');
            //invalid
        }
        if (surname == "") {
            $("#surname").addClass('invalid');
        }
    }
}


function listRooms() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms',
        crossDomain:    true,
        dataType: "json",
        success: function(result){
            console.log(result);
        },
        error: function(result){
            console.log("errror.")
            console.log(result);
        }
    });
}

function getRoom(id) {
    id = document.getElementById('id').value;

    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms/' + id,
        dataType: "json",
        success: function (result) {
            renderList(result);
        }
    });
}

function listRoomTypes() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes',
        dataType: "json",
        success: function (result) {
            //renderList(result);
            var rooms = jsonToList(result);
        }
    });
}

function getRoomType(id) {
    id = document.getElementById('id2').value;
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes/' + id,
        dataType: "json",
        success: renderList
    });
}


function updateRoomInfosServer(roomInfoRequest, callback) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes',
        crossDomain: true,
        dataType: "json",
        data: roomInfoRequest,
        success: function (result) {
            console.log(result);
            callback(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function bookRoomServer(bookingRequest, callback) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes/booking',
        crossDomain: true,
        dataType: "json",
        data: bookingRequest,
        success: function (result) {
            console.log(result);
            callback(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function checkAvailabilityServer(availabilityRequest, callback) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes/checkavailability',
        crossDomain: true,
        dataType: "json",
        data: availabilityRequest,
        success: function (result) {
            console.log(result);
            callback(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
}


function buildRoomUpdateRequest(roomtypeid, numberOfRooms, prize) {
    return JSON.stringify({
        "password": "admin",
        "typeId": roomtypeid,
        "numberOfRooms": numberOfRooms,
        "prize": prize
    });
}

function buildBookingRequest(roomtypeid, startdate, enddate, firstname, lastname) {
    return JSON.stringify({
        "typeId": roomtypeid,
        "startDate": startdate,
        "endDate": enddate,
        "firstName": firstname,
        "lastName": lastname
    });
}

function buildAvailabilityRequest(typeid, startdate, enddate) {
    return JSON.stringify({
        "typeId": typeid,
        "startDate": startdate,
        "endDate": enddate
    });
}

function jsonToList(json) {
   var list = [];

    for(var n in json) {
        list.push(json[n].id) //later i'd rather have the name of the roomtype;
        document.getElementById('roomType').options.add(new Option(json[n].id, json[n].id));
    }

    return list;
}

function renderList(json) {

    var html = '<ul>';

    for (var n in json) { // Each top-level entry
        html += '<li>' + JSON.stringify(json[n]) + '<ul>';

        html += '</ul></li>';
    }
    html += '</ul>';
    $('body').append(html);
}