/**
 * http://usejsdoc.org/
 */

// The root URL for the RESTful services

var rootURL = "http://localhost:8080/DistSys_HotelRoomReservation_war_exploded/";
//var rootURL = "http://localhost:8080/DistSys_HotelRoom_war_exploded/";
var arrivalDate;
var departureDate;
var roomType;
var givenname;
var surname;

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

function checkAvailability() {
    arrivalDate = document.getElementById('arrivalDate').value;
    departureDate = document.getElementById('departureDate').value;
    roomType = document.getElementById('roomType').value;

    console.log(window.location.pathname);

    if(departureDate < arrivalDate) {
        //invalid
    } else {
        $("#reservation-form").addClass('invisible');
        $("#book-form").removeClass('invisible');
        $('#book-form').addClass('visible');

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
            }
        });
    }
}

function goBackToForm() {
    $("#book-form").addClass('invisible');
    $("#reservation-form").removeClass('invisible');
    $('#reservation-form').addClass('visible');
}

function bookRoom() {
    givenname = document.getElementById('givenname').value;
    surname = document.getElementById('surname').value;
    console.log(givenname + " ");

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
    } else {
        //not valid
    }
}


//mödi stuff; some things still useful, some not :D

function listRooms() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms',
        crossDomain:    true,
        dataType: "json", // data type of response
        success: function(result){
            console.log(result + " " + rootURL);
           // alert('Success: ' + renderList);
        },
        error: function(result){
            console.log(result + " " + rootURL);
           // alert('Error: ' + result);
        }
    });
   // alert(" Result: "+result);
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


