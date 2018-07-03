/**
 * http://usejsdoc.org/
 */

// The root URL for the RESTful services

var pageInitialized = false;

var currentHost = window.location.host;

var rootURL = "http://" + currentHost + "/DistSys_HotelRoomReservation_war_exploded/";
var arrivalDate;
var departureDate;
var roomType;
var roomTypeName;
var givenname;
var surname;

var password;

$(document).ready(function () {

        if(pageInitialized) return;
        pageInitialized = true;
        document.getElementById("arrivalDate").valueAsDate = new Date();
        document.getElementById("departureDate").valueAsDate = new Date();

        adjustVisibilities("reservation");
});

function showBookForm() {
    if(roomTypeName == null) {
        roomTypeName = $('#roomType option:selected').text()
    }

    $('#availableText').html('The room of type ' + roomTypeName + " is from " + arrivalDate.getDate() + "." +
        arrivalDate.getMonth() + "." + arrivalDate.getFullYear() + " to " + departureDate.getDate() + "." +
        departureDate.getMonth() + "." + departureDate.getFullYear() + " still available!");


    adjustVisibilities("book");

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

function showAddRoom() {
    adjustVisibilities("addRooms");
}

function login() {

    var pass = document.getElementById('password').value;
    if(pass == "admin") {
        password = pass;

        adjustVisibilities("manageRooms");
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

    if(type != "" && amount != "" && price != "") {

        var data = buildRoomUpdateRequest(type, amount, price);
        updateRoomInfosServer(data);
        adjustVisibilities("manage");

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
    $("#manage-rooms-card").removeClass('invisible').addClass('invisible');
    $("#add-rooms-form").removeClass('invisible').addClass('invisible');


    switch (type) {
        case "reservation":
            $("#reservation-form").removeClass('invisible');
            $("#arrivalDate").removeClass('invalid');
            $("#departureDate").removeClass('invalid');
            roomTypesToOptions();
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
        case "manageRooms":
            $("#manage-rooms-card").removeClass('invisible');
            var result = listRoomTypes();
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

    if (departureDate < arrivalDate || arrivalDate < new Date(Date.now()-24*60*60*1000)) {
        //invalid
        $("#arrivalDate").addClass('invalid');
        $("#departureDate").addClass('invalid');

    } else {
        var request = buildAvailabilityRequest(roomType, arrivalDate.toJSON(), departureDate.toJSON());

        checkAvailabilityServer(request, function (result) {
            if (result.isRoomAvailable) {
                var availableRooms = result.numAvailableRooms;
                console.log("available: ", availableRooms);
                showBookForm();
            } else {
                console.log("not available.");
                var alternatives = result.alternativeRooms;

                $('#alternativeOptions').html("");

                var i = 0;
                for(var n in result.alternativeRooms) {
                    $('#alternativeOptions').append("<div class='row'>" +
                        "<div class='col-md-3' id='alt-arrivalDate-"+i+"'>"+n+"</div>" +
                        "<div class='col-md-3' id='alt-departureDate-"+i+"'>"+n+"</div>" +
                        "<div class='col-md-3' id='alt-name-"+i+"'>"+n+"</div>" +
                        "<div class='col-md-3'> " +
                        "<button class='borderless-button' id='alt-"+i+"' onClick='showBookAlternativeForm(this.id)'>Book!</button>" +
                        "</div>  </div>");
                    i++;
                }

                console.log(result.alternativeRooms);

                showAlternativesForm();
            }
        });
    }
}

function showBookAlternativeForm(fullId) {
    var id = fullId.split('-');

    var arr = ($('#alt-arrivalDate-'+id[1]).html()).split('.');
    var dep = ($('#alt-departureDate-'+id[1]).html()).split('.');

    arrivalDate = new Date(arr[2], arr[1], arr[0]);
    departureDate = new Date(dep[2], dep[1], dep[0]);
    roomTypeName = $('#alt-name-'+id[1]).html();


    showBookForm();
}

function bookRoomCommand() {
    givenname = document.getElementById('givenname').value;
    surname = document.getElementById('surname').value;

    $("#givenname").removeClass('invalid');
    $("#surname").removeClass('invalid');

    if (givenname != "" && surname != "") {

        var data = buildBookingRequest(roomType, arrivalDate.toJSON(), departureDate.toJSON(), givenname, surname);
        bookRoomServer(data, function(result){});


    } else {
        if (givenname == "") {
            $("#givenname").addClass('invalid');
        }
        if (surname == "") {
            $("#surname").addClass('invalid');
        }
    }
}


function editRoomType(button) {
    var id = button.id;

    var name =  $("#name-"+id).html();
    var amount =  $("#amount-"+id).html();
    var price = $("#price-"+id).html();

    $("#name-"+id).html("<input type='text' class='form-control' id='name-input-"+id+"' required value='"+name+"'/>");
    $("#amount-"+id).html("<input type='number' step='1' class='form-control' id='amount-input-"+id+"' value='"+amount+"' required/>");
    $("#price-"+id).html("<input type='number' step='any' class='form-control' id='price-input-"+id+"' value='"+price+"' required/>");
    $('#button-'+id).html("<button class='borderless-button col-md-12' onClick='saveRoomType("+ id+ ")'>Ok</button>")
}

function saveRoomType(id) {

    var name = $("#name-input-"+id).val();
    var amount = $('#amount-input-'+id).val();
    var price = $('#price-input-'+id).val();

    //request: "updateRoom/{id}"
   var data = buildExistingRoomUpdateRequest(name, amount, price, id);
   updateExistingRoomType(id, data);

   // $('#existing-rooms').html("");
   // listRoomTypes();

    $("#name-"+id).html(name);
  $("#amount-"+id).html(amount);
  $("#price-"+id).html(price);

    $('#button-'+id).html(
        "<div class='col-md-6'><button class='borderless-button' id='"+id+"' onClick='editRoomType(this)'>Edit</button></div> " +
        "<div class='col-md-6'><button class='borderless-button' id='"+id+"-delete' onClick='deleteRoomTypeCommand(this)'>Delete " +
        "</button></div> " )

}

function deleteRoomTypeCommand(button) {
    var fullId = button.id;
    var id = fullId.split('-');

    //request "deleteRoom/{id}"
    deleteRoomType(id[0]);

    //reload rooms
    $('#existing-rooms').html("");
    listRoomTypes();
}


//DELETE /roomtypes/{id}
function deleteRoomType(id) {
    $.ajax({
        type: 'DELETE',
        url: rootURL + 'roomtypes/'+id,
        crossDomain: true,
        dataType: "json",
        success: function(result){
            return true;
        },
        error: function(result){
            console.log(result)
            return false;
        }
    })
}

//PUT /roomtypes/{id}
function updateExistingRoomType(id, data) {
    $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: rootURL + 'roomtypes/'+id,
        crossDomain: true,
        dataType: "json",
        data: data,
        success: function (result) {
            console.log(result);
          //  callback(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
}

//GET /hotelrooms
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

//GET /hotelrooms/{id}
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

//GET /roomtypes
function listRoomTypes() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes',
        dataType: "json",
        success: function (result) {
            //renderList(result);
            listExisitingRooms(result);
            return result;
        }
    });
}

//GET /roomtypes
function roomTypesToOptions() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes',
        dataType: "json",
        success: function (result) {
            //renderList(result);
           jsonToList(result);
            return result;
        }
    });
}

//GET /roomtypes/{id}
function getRoomType(id) {
    id = document.getElementById('id2').value;
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes/' + id,
        dataType: "json",
        success: renderList
    });
}

//POST /roomtypes
function updateRoomInfosServer(roomInfoRequest, callback) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes',
        crossDomain: true,
        dataType: "json",
        data: roomInfoRequest,
        success: function (result) {
            $("#newType").val("");
            $("#amount").val("");
            $("#price").val("");
           // console.log(result);
           // callback(result);
        },
        error: function (result) {
            alert("An error occurred, but our team won't fix it because " +
                "this is only a students project " +
                "worth 20 points.")
            console.log(result);
        }
    });
}

//POST /roomtypes/booking
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
            adjustVisibilities("reservation");
        },
        error: function (result) {
            console.log(result);
        }
    });
}

//POST /roomtypes/checkavailability
function checkAvailabilityServer(availabilityRequest, callback) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes/checkavailability',
        crossDomain: true,
        dataType: "json",
        data: availabilityRequest,
        success: function (result) {
            callback(result);

            $('#alternativeOptions').html();
            for(var a in result.alternativeRooms) {
                $('#alternativeOptions').append("<div>"+a.id+"</div>");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}



function buildRoomUpdateRequest(name, numberOfRooms, price) {
    return JSON.stringify({
        "password": password,
        "typeId": 0,
        "numberOfRooms": numberOfRooms,
        "price": price,
        "name": name
    });
}

function buildExistingRoomUpdateRequest(name, numberOfRooms, price, id) {
    return JSON.stringify({
        "password": password,
        "typeId": id,
        "numberOfRooms": numberOfRooms,
        "price": price,
        "name": name
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

function listExisitingRooms(json) {

    $("#existing-rooms").html("");

    for(var n in json) {
        var id = json[n].id;

        $("#existing-rooms").append(
           " <div class='row'> " +
             " <div class='col-md-1' id='id-"+id+"'> " +
            id +
            "</div>" +
            "<div class='col-md-3' id='name-"+id+"'>" + json[n].name +"</div> " +
            "<div class='col-md-3' id='amount-"+id+"'>" + json[n].numberOfRooms + "</div> " +
            "<div class='col-md-2' id='price-"+id+"'>" + json[n].price + "</div> " +
            "<div class='col-md-3 row' id='button-"+id+"'> " +
            "<div class='col-md-6'><button class='borderless-button' id='"+id+"' onClick='editRoomType(this)'>Edit</button></div> " +
            "<div class='col-md-6'><button class='borderless-button' id='"+id+"-delete' onClick='deleteRoomTypeCommand(this)'>Delete " +
            "</button></div> " +
            "</div> " +
            "</div>");
    }
}

function jsonToList(json) {
   var list = [];

    document.getElementById('roomType').options = [];

    for(var n in json) {
        list.push(json[n].name) ;
        document.getElementById('roomType').options.add(new Option(json[n].name, json[n].id));
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