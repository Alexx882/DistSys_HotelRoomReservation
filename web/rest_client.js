/**
 * http://usejsdoc.org/
 */

// The root URL for the RESTful services
var rootURL = "http://localhost:8080/DistSys_HotelRoomReservation_war_exploded/";
var arrivalDate;
var departureDate;
var roomType;
var givenname;
var surname;

$(document).ready(function () {
    document.getElementById("arrivalDate").valueAsDate = new Date();
    document.getElementById("departureDate").valueAsDate = new Date();

    //if i knew how the output looks like I'd like to use it as options in the #roomtype input
    listRoomTypes();
});

function checkAvailability() {
    arrivalDate = document.getElementById('arrivalDate').value;
    departureDate = document.getElementById('departureDate').value;
    roomType = document.getElementById('roomType').value;

    console.log(window.location.pathname);

    if (departureDate < arrivalDate) {
        //invalid
    } else {
        $("#reservation-form").addClass('invisible');
        $("#book-form").removeClass('invisible');
        $('#book-form').addClass('visible');

        $('#availableText').html('The room of type ' + roomType + " is from " + arrivalDate + " to " + departureDate + " still available!");

        //try to post this info on server
        // todo load id from room type, correct date types
        var request = buildAvailabilityRequest(2, new Date, new Date);

        checkAvailabilityServer(request, function (result) {
            if (result.isRoomAvailable) {
                var availableRooms = result.numAvailableRooms;
                console.log("available: ", availableRooms);
                // todo show #book-form
            } else {
                console.log("not available.");
                var alternatives = result.alternativeRooms;
                // todo show alternatives
            }
        });
    }
}

function goBackToForm() {
    $("#book-form").addClass('invisible');
    $("#reservation-form").removeClass('invisible');
    $('#reservation-form').addClass('visible');
}

// todo use bookRoomServer(request, callback)
// todo see checkavail for details.
function bookRoom() {
    givenname = document.getElementById('givenname').value;
    surname = document.getElementById('surname').value;
    console.log(givenname + " ");

    if (givenname != "" && surname != "") {

        //data as json - although typeId still int
        var data = JSON.stringify({
            "typeId": 1,
            "startDate": arrivalDate,
            "endDate": departureDate,
            "firstName": givenname,
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
    } else {
        //not valid
    }
}


function listRooms() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms',
        crossDomain: true,
        dataType: "json", // data type of response
        success: function (result) {
            console.log(result + " " + rootURL);
        },
        error: function (result) {
            console.log(result + " " + rootURL);
        }
    });
}

function getRoom(id) {
    id = document.getElementById('id').value;

    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms/' + id,
        dataType: "json",
        success: renderList
    });
}

function listRoomTypes() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes',
        dataType: "json",
        success: renderList
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


function renderList(json) {
    var html = '<ul>';

    for (var n in json) { // Each top-level entry
        html += '<li>' + JSON.stringify(json[n]) + '<ul>';

        html += '</ul></li>';
    }
    html += '</ul>';
    $('body').append(html);
}