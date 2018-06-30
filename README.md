# DistSys_HotelRoomReservation_Server
Server for the Hotel Room Reservation program.

Setup everything for REST:
https://www.jetbrains.com/help/idea/creating-and-running-your-first-restful-web-service.html

If the glassfish server is setup correctly, the service should be available under 
http://localhost:8080/DistSys_HotelRoomReservation_war_exploded/

### API Docu:

GET /hotelrooms         - list of all hotelrooms

GET /hotelrooms/{id}    - hotelroom with ID

GET /roomtypes          - list of all roomtypes

GET /roomtypes/{id}     - roomtype with ID

POST /roomtypes         - creates a roomtype and returns the new ID from the db
                          uses communication.AdminRequest (password is currently "admin"), eg:

```javascript 
{
    "password": "admin",
    "typeId": 2,
    "numberOfRooms": 2,
    "price": 5.7,
    "name": "presidential"
}
```

DELETE /roomtypes/{id}  - delete a roomtype with ID
                          uses the AdminRequest only to check the credentials
                          
PUT /roomtypes/{id}     - update a roomtype with ID
                          uses the AdminRequest
                          
POST /roomtypes/booking - (try to) book a roomtype
                          uses communication.BookingRequest, eg:
  
```javascript
{
    "typeId": 2,
    "startDate": "2018-06-05T13:27",
    "endDate": "2018-06-05T13:27",
    "firstName": "peter",
    "lastName": "Bauer"
}
```

POST /roomtypes/checkavailability - checks if a room of the given type is available
                                    uses communication.AvailabilityRequest and communication.AvailabilityResponse