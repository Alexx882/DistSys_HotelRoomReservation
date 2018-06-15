/**
 * http://usejsdoc.org/
 */

// The root URL for the RESTful services
var rootURL = "http://localhost:8080/DistSys_HotelRoom_war_exploded/";
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
        url: rootURL + '/hotelrooms/'+id,
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
        url: rootURL+ '/roomtypes'+ id,
        dataType: "json",
        success: renderList
    });
}


function setRoomType() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL+ '/roomtypes',
        dataType: "json",
        data: getRoomTypeData(),
        success: function(result){
            console.log(result);
           // alert('Success: ' + result);
        },
        error: function(result){
            console.log(result);
         //   alert('An Error occured: ' + result);
        }
    });
}

function book() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL+ '/roomtypes/booking',
        dataType: "json",
        data: getBookData(),
        success: function(result){
            console.log(result);
           // alert('Success: ' + result);
        },
        error: function(result){
            console.log(result);
           // alert('An Error occured: ' + result);
        }
    });
}


// Helper function to serialize all the form fields into a JSON string
function getRoomTypeData() {
    /*
    {
        "password": "admin",
        "typeId": 2,
        "numberOfRooms": 2,
        "prize": 5.7
    }*/

    return JSON.stringify({
        "password": "admin",
        "typeId": 2,
        "numberOfRooms": 2,
        "prize": 5.7
    });


    /*return JSON.stringify({
        "id": $('#id').val(),
        "name": $('#name').val(),
        "grapes": $('#grapes').val(),
        "country": $('#country').val(),
        "region": $('#region').val(),
        "year": $('#year').val(),
        "description": $('#description').val()
        }); */
}

function getBookData() {


    return JSON.stringify({
        "typeId": 2,
        "startDate": "2018-06-05T13:27",
        "endDate": "2018-06-05T13:27",
        "firstName": "Peter",
        "lastName": "Bauer"
    });
}




function renderList(data) {
    // JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
    var list = data == null ? [] : (data instanceof Array ? data : [data]);


    $.each(list, function(index, id) {
        $('#result').append('<li><p>'+id.value+'</p></li>');
    });
}
