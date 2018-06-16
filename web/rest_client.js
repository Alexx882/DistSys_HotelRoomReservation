/**
 * http://usejsdoc.org/
 */

// The root URL for the RESTful services
var rootURL = "http://localhost:8080/DistSys_HotelRoomReservation_war_exploded/";

//listRooms() ++++++  GET /hotelrooms - list of all hotelrooms 

//getRoom(id) ++++++  GET /hotelrooms/{id} - hotelroom with ID

//listRoomTypes() ++  GET /roomtypes - list of all roomtypes

//getRoomType(id) ++  GET /roomtypes/{id} - roomtype with ID

//setRoomType()   ++  POST /roomtypes - create/update a roomtype uses communication.AdminRequest (password is currently "admin"), eg:
//book() 	  ++++++  POST /roomtypes/booking

//TODO: success ?

function listRooms() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms',
        dataType: "json", // data type of response
        success: function (result) {
            // alert('Success: ' + JSON.stringify(result));
            renderList(result);
        },
        error: function (result) {
            alert('Error: ' + JSON.stringify(result));
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
            // alert('Success: ' + JSON.stringify(result));
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
            renderList(result);
        }
    });
}

function getRoomType(id) {
    id = document.getElementById('id2').value;
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes/' + id,
        dataType: "json",
        success: function (result) {
            // alert('Success: ' + JSON.stringify(result));
            renderList(result);
        }
    });
}

function updateRoomInfos(roomInfoRequest, callback) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes',
        dataType: "json",
        data: roomInfoRequest,
        success: function (result) {
            callback(result);
        },
        error: function (result) {
            alert('An Error occured: ' + result);
        }
    });
}

function bookRoom(bookingRequest, callback) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes/booking',
        dataType: "json",
        data: bookingRequest,
        success: function (result) {
            callback(result);
        },
        error: function (result) {
            alert('An Error occured: ' + result);
        }
    });
}

function checkAvailability(availabilityRequest, callback) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'roomtypes/checkavailability',
        dataType: "json",
        data: availabilityRequest,
        success: function (result) {
            callback(result);
        },
        error: function (result) {
            alert('An Error occured: ' + result);
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