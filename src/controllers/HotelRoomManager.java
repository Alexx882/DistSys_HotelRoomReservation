package controllers;

import communication.AvailabilityRequest;
import communication.AvailabilityResponse;
import communication.BookingRequest;
import database.SqlRepos;
import models.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public class HotelRoomManager {

    //private DummyRepos dbRepos = new DummyRepos();
    private SqlRepos dbRepos = new SqlRepos();
    //

    /**
     * Updates the RoomType.
     *
     *
     * @param typeId: id of Room Type
     * @param numberOfRooms: Number of Available Rooms (new) for Room Type
     * @param price: (New) Price of RoomType
     */
    public void updateRoomProperties(int typeId, String name, int numberOfRooms, double price) {
        //update Room Props

        RoomtypesEntity targetRoomType = dbRepos.getRoomType(typeId);

        targetRoomType.setName(name);
        targetRoomType.setNumberOfRooms(numberOfRooms);
        targetRoomType.setPrice(price);

        dbRepos.updateRoomType(targetRoomType);

    }

    /**
     * Books the room or gives recommendations
     *
     * @param request Booking request containing typeId( Room Type), startDate, endDate
     */
    public boolean bookRoom(BookingRequest request) {
        // booking method: Returns true on success, false on failure. Failure might be: no rooms available, error, ...
        // for recommendations check getRecommendations Method

        /*if (getNoAvailableRooms(request.typeId, request.startDate, request.endDate) > 0) {
            // book room; DB CALL
*/
        try{
            BookingsEntity be = new BookingsEntity();
            be.setRoomtypeId(request.typeId);
            be.setFirstname(request.firstName);
            be.setLastname(request.lastName);
            be.setArrivalDate(getTimestamp(request.startDate));
            be.setDepartureDate(getTimestamp(request.endDate));

            dbRepos.book(be);
            return true;

        } catch (Exception e){
            e.printStackTrace();
            return false;
        }

       /* }else {
            //an error occured; booking failed - return false
            return false;
        }*/

    }

    /**
     * returns number of available rooms of certain type during selected period
     *
     * @param typeId Room Type Id
     * @param startDate .
     * @param endDate .
     * @return returns number ov available rooms
     */
    public int getNoAvailableRooms(int typeId, Date startDate, Date endDate) {

        //Done : When DatabaseRepos is updated, check if room is booked from day x to day y
        // Used joda time bc easy overlapping check

        int availableRooms=dbRepos.getRoomType(typeId).getNumberOfRooms();
        int bookedRooms = 0;

        List<BookingsEntity> be = dbRepos.getBookings();

        for (BookingsEntity b:be){
            if (b.getRoomtypeId()==typeId){
                if(
                    // startDate between arrival and departure
                        (startDate.compareTo(b.getArrivalDate()) >= 0
                                && startDate.compareTo(b.getDepartureDate()) <= 0)
                                // endDate between arrival and departure
                                || (endDate.compareTo(b.getArrivalDate()) >= 0
                                && endDate.compareTo(b.getDepartureDate()) <= 0)
                                // start before, end after -> completely overlaps
                                || (startDate.compareTo(b.getArrivalDate()) <= 0
                                && endDate.compareTo(b.getDepartureDate()) >= 0)) {

//                DateTime requestStart = new DateTime(startDate);
//                DateTime requestEnd = new DateTime(endDate);
//
//                DateTime bookingStart = new DateTime(b.getArrivalDate());
//                DateTime bookingEnd = new DateTime(b.getDepartureDate());
//
//                Interval requestInterval = new Interval(requestStart, requestEnd);
//                Interval bookingInterval = new Interval(bookingStart, bookingEnd);
//
//                if (requestInterval.overlaps(bookingInterval)){
                    bookedRooms++;
                }

            }
        }

        availableRooms = availableRooms - bookedRooms;

        return availableRooms;
    }

    public AvailabilityResponse checkRoomAvailability(AvailabilityRequest request) {

        AvailabilityResponse response = new AvailabilityResponse(request);

        int avRooms = getNoAvailableRooms(request.typeId, request.startDate, request.endDate);

        if (avRooms>0){
            response.isRoomAvailable = true;
            response.numAvailableRooms = avRooms;
        } else {
            response.isRoomAvailable = false;

            //fill list of alternatives

            List<RoomtypesEntity> roomTypes = dbRepos.getRoomTypes();

            for (RoomtypesEntity i:roomTypes){
                if (getNoAvailableRooms(i.getId(), request.startDate, request.endDate)>0 && response.alternativeRooms.size()<5){
                    response.alternativeRooms.add(i);
                }
            }

        }

        // response.numAvailableRooms = 5;

        return response;
    }

    public void removeRoomType(int typeId){
        dbRepos.deleteRoomType(typeId);
    }

    public int addRoomType(String name, int numberOfRooms, double price){

        RoomtypesEntity rte = new RoomtypesEntity();
        rte.setName(name);
        rte.setNumberOfRooms(numberOfRooms);
        rte.setPrice(price);

        /*int typeId =*/ dbRepos.updateRoomType(rte);

        return -1;
    }

    private Timestamp getTimestamp(java.util.Date date){
        return date == null ? null : new java.sql.Timestamp(date.getTime());
    }
}