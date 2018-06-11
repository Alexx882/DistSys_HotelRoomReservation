package controllers;

import communication.BookingRequest;
import models.HotelRoom;
import models.Recommendation;

import java.util.ArrayList;
import java.util.Date;

public class HotelRoomManager {
    private static final int LOWEST_ROOM_CAT = 0;
    private static final int HIGHEST_ROOM_CAT = 5;

    /**
     * Updates the RoomType.
     *
     *
     * @param typeId
     * @param numberOfRooms
     * @param prize
     */
    public void updateRoomProperties(int typeId, int numberOfRooms, double prize) {
        // ToDo: DB call to update room props.
    }

    /**
     * Books the room or gives recommendations
     *
     * @param request
     */
    public void bookRoom(BookingRequest request) {
        // todo booking and recommendations
        // todo could also be done with different methods for availabilty check etc.
        // todo @Markus, feel free to implement in any way and tell me or adapt the service

        //ToDo: check if request is valid

        if (request.isEmpty()) {
            // ToDo: Request mustn't be null/empty; Response with err (?)
        } else if (request.isInvalid()) {
            // ToDo: Request is invalid, at least one attr is null. Response accordingly!
        }

        if (getNoAvailableRooms(request.typeId, request.startDate, request.endDate) > 0) {
            // ToDo book room; DB CALL
        } else if (getNoAvailableRooms(request.typeId, request.startDate, request.endDate) == 0) {
            // no room available, give recommendations

            ArrayList<Recommendation> recommendations = getRecommendations(request.typeId, request.startDate, request.endDate);

            if (recommendations.size() > 0) {
                //ToDo: not empty, handle response
            } else {
                //ToDo: recommendation set empty / err, response accordingly
            }


        } else {
            //an error occured
            //ToDo: Error handling
        }

    }

    /**
     * returns number of available rooms of certain type during selected period
     *
     * @param typeId
     * @param startDate
     * @param endDate
     * @return
     */
    public int getNoAvailableRooms(int typeId, Date startDate, Date endDate) {
        int availableRooms = -1;
        // ToDo: DB Check - available rooms
        return availableRooms;
    }

    /**
     * returns ArrayList of recommendations for certain room type during a selected period
     * Recommendation may be other category of room, (AND/OR other dates) (near range +/- x Days, +/- 1 category
     * If returns empty ArrayList no recommendations are found
     *
     * @param typeId
     * @param startDate
     * @param endDate
     * @return
     */

    public ArrayList<Recommendation> getRecommendations(int typeId, Date startDate, Date endDate) {
        //ToDo: Build recommendation List return it

        ArrayList<Recommendation> recommendations = new ArrayList<>();

        int rType = LOWEST_ROOM_CAT;
        Date rStartDate = startDate,
                rEndDtate = endDate;

        while (rType < HIGHEST_ROOM_CAT) {
            if (getNoAvailableRooms(rType, startDate, endDate) > 0 && rType != typeId) {
                recommendations.add(new Recommendation(rType, startDate, endDate));
            }
            rType++;
        }

        return recommendations;

    }
}
