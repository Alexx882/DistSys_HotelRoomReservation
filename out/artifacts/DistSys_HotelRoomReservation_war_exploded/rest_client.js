/**
 * http://usejsdoc.org/
 */

// The root URL for the RESTful services
<<<<<<< HEAD

var rootURL = "http://localhost:8080/DistSys_HotelRoomReservation_war_exploded/";
//var rootURL = "http://localhost:8080/DistSys_HotelRoom_war_exploded/";
=======
var rootURL = "http://localhost:8080/DistSys_HotelRoom_war_exploded/";
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
var arrivalDate;
var departureDate;
var roomType;
var givenname;
var surname;

<<<<<<< HEAD
$(document).ready(function () {
    document.getElementById("arrivalDate").valueAsDate = new Date();
    document.getElementById("departureDate").valueAsDate = new Date();

    listRoomTypes();
});

function checkAvailabilityCommand() {
    arrivalDate = new Date(document.getElementById('arrivalDate').value);
    departureDate = new Date(document.getElementById('departureDate').value);
    roomType = document.getElementById('roomType').value;

    console.log(departureDate);

    if (departureDate < arrivalDate) {
=======
//listRooms() ++++++  GET /hotelrooms - list of all hotelrooms 

//getRoom(id) ++++++  GET /hotelrooms/{id} - hotelroom with ID

//listRoomTypes() ++  GET /roomtypes - list of all roomtypes

//getRoomType(id) ++  GET /roomtypes/{id} - roomtype with ID

//setRoomType()   ++  POST /roomtypes - create/update a roomtype uses communication.AdminRequest (password is currently "admin"), eg:
//book() 	  ++++++  POST /roomtypes/booking

$( document ).ready(function() {
    document.getElementById("arrivalDate").valueAsDate = new Date();
    document.getElementById("departureDate").valueAsDate = new Date();

   //if i knew how the output looks like I'd like to use it as options in the #roomtype input
    listRoomTypes();
});

// todo use checkAvailability(request, callback)
function checkAvailability() {
    arrivalDate = document.getElementById('arrivalDate').value;
    departureDate = document.getElementById('departureDate').value;
    roomType = document.getElementById('roomType').value;

    console.log(window.location.pathname);

    if(departureDate < arrivalDate) {
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
        //invalid
    } else {
        $("#reservation-form").addClass('invisible');
        $("#book-form").removeClass('invisible');
        $('#book-form').addClass('visible');

<<<<<<< HEAD
        $('#availableText').html('The room of type ' + $('#roomType option:selected').text() + " is from " + arrivalDate.getDate() + "." +
            arrivalDate.getMonth() + "." + arrivalDate.getFullYear() + " to " + departureDate.getDate() + "." +
            departureDate.getMonth() + "." + departureDate.getFullYear() + " still available!");

        // try to post this info on server
        // todo load id from room type
        var request = buildAvailabilityRequest("1", arrivalDate.toJSON(), departureDate.toJSON());

        checkAvailabilityServer(request, function (result) {
            if (result.isRoomAvailable) {
                var availableRooms = result.numAvailableRooms;
                console.log("available: ", availableRooms);
                // todo show #book-form
            } else {
                console.log("not available.");
                var alternatives = result.alternativeRooms;
                // todo show alternatives
=======
        $('#availableText').html('The room of type ' + roomType + " is from " + arrivalDate + " to " + departureDate + " still available!");


        //try to post this info on server
        $.ajax({
            type: 'GET',
            url: rootURL + 'check?arrivalDate='+arrivalDate+'&departureDate='+departureDate+'&roomType='+roomType,
            crossDomain:    true,
            dataType: "json",
            success: function(result){
                console.log(result);
                //if result 204, show #book-form
                //else result 200 and json with alternatives

            },
            error: function(result){
                console.log(result);
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
            }
        });
    }
}

function goBackToForm() {
    $("#book-form").addClass('invisible');
    $("#reservation-form").removeClass('invisible');
    $('#reservation-form').addClass('visible');
}

<<<<<<< HEAD
function bookRoomCommand() {
=======
// todo use bookRoom(request, callback)
function bookRoom() {
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
    givenname = document.getElementById('givenname').value;
    surname = document.getElementById('surname').value;
    console.log(givenname + " ");

<<<<<<< HEAD
    if (givenname != "" && surname != "") {

        var data = buildBookingRequest(roomType, arrivalDate, departureDate, givenname, surname);
        bookRoomServer(data, function(result){});


=======
    if(givenname != "" && surname != "") {

        //data as json - although typeId still int
        var data = JSON.stringify({
            "typeId": 1,
            "startDate": arrivalDate,
            "endDate": departureDate,
            "firstName":givenname,
            "lastName": surname
        });

        //post that shit
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: rootURL + '/roomtypes/booking',
            dataType: "json",
            data: data,
            success: function (result) {
                console.log(result);
            },
            error: function (result) {
                console.log(result);
            }
        });
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
    } else {
        //not valid
    }
}


<<<<<<< HEAD
=======
// todo remove: mödi stuff; some things still useful, some not :D

>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
function listRooms() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms',
        crossDomain:    true,
<<<<<<< HEAD
        dataType: "json",
        success: function(result){
            console.log(result);
        },
        error: function(result){
            console.log("errror.")
            console.log(result);
=======
        dataType: "json", // data type of response
        success: function(result){
            console.log(result + " " + rootURL);
        },
        error: function(result){
            console.log(result + " " + rootURL);
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
        }
    });
}

function getRoom(id) {
    id = document.getElementById('id').value;

    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms/' + id,
        dataType: "json",
<<<<<<< HEAD
        success: function (result) {
            renderList(result);
        }
=======
        success: renderList
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
    });
}

function listRoomTypes() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes',
        dataType: "json",
<<<<<<< HEAD
        success: function (result) {
            //renderList(result);
            var rooms = jsonToList(result);
        }
=======
        success: renderList
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
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

<<<<<<< HEAD

function updateRoomInfosServer(roomInfoRequest, callback) {
=======
function updateRoomInfos(roomInfoRequest, callback) {
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes',
<<<<<<< HEAD
        crossDomain: true,
=======
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
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

<<<<<<< HEAD
function bookRoomServer(bookingRequest, callback) {
=======
function bookRoom(bookingRequest, callback) {
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes/booking',
<<<<<<< HEAD
        crossDomain: true,
=======
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
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

<<<<<<< HEAD
function checkAvailabilityServer(availabilityRequest, callback) {
=======
function checkAvailability(availabilityRequest, callback) {
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes/checkavailability',
<<<<<<< HEAD
        crossDomain: true,
=======
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
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

<<<<<<< HEAD
function jsonToList(json) {
   var list = [];

    for(var n in json) {
        list.push(json[n].id) //later i'd rather have the name of the roomtype;
        document.getElementById('roomType').options.add(new Option(json[n].id, json[n].id));
    }

    return list;
}

function renderList(json) {

=======

function renderList(json) {
>>>>>>> faca4b140d047eec17b012ef5c6cb92338cf3326
    var html = '<ul>';

    for (var n in json) { // Each top-level entry
        html += '<li>' + JSON.stringify(json[n]) + '<ul>';

        html += '</ul></li>';
    }
    html += '</ul>';
    $('body').append(html);
}