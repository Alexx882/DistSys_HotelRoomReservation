package controllers;

import communication.AvailabilityRequest;
import communication.AvailabilityResponse;
import communication.BookingRequest;

import java.util.Date;

public class HotelRoomManager {
    /**
     * Updates the RoomType.
     *
     * @param typeId
     * @param numberOfRooms
     * @param prize
     */
    public void updateRoomProperties(int typeId, int numberOfRooms, double prize) {
        // todo
    }

    /**
     * Books the room or gives recommendations
     *
     * @param request
     */
    public boolean bookRoom(BookingRequest request) {
        // todo booking and recomendations
        // todo could also be done with different methods for availabilty check etc.
        // todo @Markus, feel free to implement in any way and tell me or adapt the service

        return true;
    }

    public AvailabilityResponse checkRoomAvailability(AvailabilityRequest request) {
        // todo der teil der de verfuegbarkeit checkt...
        AvailabilityResponse response = new AvailabilityResponse(request);
        response.isRoomAvailable = true;
        response.numAvailableRooms = 5;
        return response;
    }
}
