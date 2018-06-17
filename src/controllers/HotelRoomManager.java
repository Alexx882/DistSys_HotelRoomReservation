package controllers;

import communication.AdminRequest;
import communication.AvailabilityRequest;
import communication.AvailabilityResponse;
import communication.BookingRequest;
import database.DatabaseRepository;
import database.DummyRepos;
import models.HotelRoom;
import models.Recommendation;
import models.RoomType;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class HotelRoomManager {

    private DatabaseRepository dbRepos = new DummyRepos();

    /**
     * Updates the RoomType.
     *
     *
     * @param typeId: id of Room Type
     * @param numberOfRooms: Number of Available Rooms (new) for Room Type
     * @param prize: (New) Price of RoomType
     */
    public void updateRoomProperties(int typeId, int numberOfRooms, double prize) {
        //update Room Props

        RoomType targetRoomType = dbRepos.getRoomType(typeId);

        targetRoomType.setPrize(prize);
        targetRoomType.setNumberOfRooms(numberOfRooms);

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
                RoomType targetRoomType = dbRepos.getRoomType(request.typeId);
                if (targetRoomType.getNumberOfRooms()>0){
                    targetRoomType.setNumberOfRooms(targetRoomType.getNumberOfRooms()-1);
                    return true;
                } else {
                    return false;
                }
               // return true;
            } catch (Exception e){
                return false;
            }

        }/* else if (getNoAvailableRooms(request.typeId, request.startDate, request.endDate) == 0) {
            // no room available, give recommendations

            List<Recommendation> recommendations = getRecommendations(request.typeId, request.startDate, request.endDate);

            if (recommendations.size() > 0) {
                String response = "Sorry, but we have not found any free rooms in category "+request.typeId+" between "+request.startDate.toString()+" and "+request.endDate.toString()+".";
                response+="\nWe recommend the following available rooms:\n";

                for (Recommendation i:recommendations){
                    response+=i.toString();
                    response+="\n";
                }

            } else {
                return false;
            }


        } */else {
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
    private int getNoAvailableRooms(int typeId, Date startDate, Date endDate) {

        //ToDo : When DatabaseRepos is updated, check if room is booked from day x to day y

        int availableRooms;

        /*List<HotelRoom> allRooms = dbRepos.getRooms();

        for (HotelRoom i:allRooms){
           // if (!i.isBooked(startDate, endDate) && i.getTypeId()==typeId){
                availableRooms++;
           // }
        }*/

        RoomType targetRoom = dbRepos.getRoomType(typeId);

        availableRooms=targetRoom.getNumberOfRooms();

        return availableRooms;
    }

    public AvailabilityResponse checkRoomAvailability(AvailabilityRequest request) {

        AvailabilityResponse response = new AvailabilityResponse(request);

        if (dbRepos.getRoomType(request.typeId).getNumberOfRooms()>0){
            response.isRoomAvailable = true;
            response.numAvailableRooms = dbRepos.getRoomType(request.typeId).getNumberOfRooms();
        } else {
            response.isRoomAvailable = false;

            //fill list of alternatives

            List<RoomType> roomTypes = dbRepos.getRoomTypes();

            for (RoomType i:roomTypes){
                if (i.getNumberOfRooms()>0){
                    response.alternativeRooms.add(i.getId());
                }
            }

        }

       // response.numAvailableRooms = 5;

        return response;
    }

    /*

    Commented out bc not in use. Maybe some fragments will help later, so keep I'll keep it here ATM

    public List<Recommendation> getRecommendations(int typeId, Date startDate, Date endDate) {
        //Builds recommendation List & return it

        List<Recommendation> recommendations = new ArrayList<>();
        List<RoomType> roomTypes = dbRepos.getRoomTypes();


        Calendar startCal = Calendar.getInstance(),
                endCal = Calendar.getInstance();

        startCal.setTime(startDate);
        endCal.setTime(endDate);

        startCal.add(Calendar.DATE, -7);
        endCal.add(Calendar.DATE, -7);


        for (int j=0; j<16; j++){


             //Checks for selected Period +/- 7 Days if something is available in ANY category


            for (RoomType k : roomTypes){
                if (getNoAvailableRooms(k.getId(), startCal.getTime(), endCal.getTime()) > 0 ){
                    recommendations.add(new Recommendation(k.getId(), startCal.getTime(), endCal.getTime()));
                }
            }
            startCal.add(Calendar.DATE, 1);
            endCal.add(Calendar.DATE, 1);
        }


        return recommendations;

    }

*/
}