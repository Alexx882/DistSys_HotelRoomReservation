package controllers;

import communication.AdminRequest;
import communication.AvailabilityRequest;
import communication.AvailabilityResponse;
import communication.BookingRequest;
import database.DatabaseRepository;
import database.DummyRepos;
import database.MySqlRepos;
import database.SqlRepos;
import models.*;
import org.joda.time.DateTime;
import org.joda.time.Interval;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class HotelRoomManager {

    //private DummyRepos dbRepos = new DummyRepos();
    //private SqlRepos dbRepos = new SqlRepos();
    private MySqlRepos dbRepos = new MySqlRepos();

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

    }

    /**
     * Books the room or gives recommendations
     *
     * @param request Booking request containing typeId( Room Type), startDate, endDate
     */
    public boolean bookRoom(BookingRequest request) {
        // booking method: Returns true on success, false on failure. Failure might be: no rooms available, error, ...
        // for recommendations check getRecommendations Method

        if (getNoAvailableRooms(request.typeId, request.startDate, request.endDate) > 0) {
            // book room; DB CALL

            try{
                //ToDo: when dbRepos updated, check if there is insert or book method for room
               // dbRepos.bookRoom(request.typeId, request.startDate, request.endDate);
                RoomtypesEntity targetRoomType = dbRepos.getRoomType(request.typeId);

                //check if enough rooms available
                if (getNoAvailableRooms(request.typeId, request.startDate, request.endDate)>0){

                    BookingsEntity be = new BookingsEntity();
                    be.setArrivalDate((Timestamp) request.startDate);

                    dbRepos.book(be);
                    return true;
                } else {
                    return false;
                }
               // return true;
            } catch (Exception e){
                return false;
            }

        }else {
            //an error occured; booking failed - return false
            return false;
        }

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
                DateTime requestStart = new DateTime(startDate);
                DateTime requestEnd = new DateTime(endDate);

                DateTime bookingStart = new DateTime(b.getArrivalDate());
                DateTime bookingEnd = new DateTime(b.getDepartureDate());

                Interval requestInterval = new Interval(requestStart, requestEnd);
                Interval bookingInterval = new Interval(bookingStart, bookingEnd);

                if (requestInterval.overlaps(bookingInterval)){
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
                if (getNoAvailableRooms(i.getId(), request.startDate, request.endDate)>0){
                    response.alternativeRooms.add(i.getId());
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

        int typeId = dbRepos.addRoomType(rte);

        return typeId;
    }
}