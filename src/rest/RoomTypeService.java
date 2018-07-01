package rest;

import communication.AdminRequest;
import communication.AvailabilityRequest;
import communication.AvailabilityResponse;
import communication.BookingRequest;
import controllers.HotelRoomManager;
import controllers.HotelSecurityManager;
import database.DatabaseRepository;
import database.DummyRepos;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/roomtypes")
public class RoomTypeService {
    private DatabaseRepository repos;
    private HotelSecurityManager securityManager;
    private HotelRoomManager roomManager;

    public RoomTypeService() {
        repos = new DummyRepos();
        securityManager = new HotelSecurityManager();
        roomManager = new HotelRoomManager();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        return Response.ok(repos.getRoomTypes(), MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSingle(@PathParam("id") int id) {
        return Response.ok(repos.getRoomType(id), MediaType.APPLICATION_JSON).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addRoomType(AdminRequest request) {
        Response possibleError = validateAdminRequest(request);
        if (possibleError != null)
            return possibleError;

        // add a new roomtype
        int newId = roomManager.addRoomType(request.name, request.numberOfRooms, request.price);

        // return id
        return Response.ok(newId).build();
    }

    @DELETE
    @Path("{id}")
    public Response deleteRoomType(@PathParam("id") int id, AdminRequest request) {
        Response possibleError = validateAdminRequest(request);
        if (possibleError != null)
            return possibleError;

        // remove the roomtype
        roomManager.removeRoomType(id);

        // return 204
        return Response.noContent().build();
    }

    @PUT
    @Path("{id}")
    public Response updateRoomType(@PathParam("id") int id, AdminRequest request) {
        Response possibleError = validateAdminRequest(request);
        if (possibleError != null)
            return possibleError;

        if (request.typeId != id)
            // why would you do that
            return Response.status(Response.Status.BAD_REQUEST).build();

        // update a roomtype
        roomManager.updateRoomType(request.typeId, request.name, request.numberOfRooms, request.price);

        // return 204
        return Response.noContent().build();
    }

    /**
     * Checks if the password is correct.
     * @param request
     * @return
     */
    private Response validateAdminRequest(AdminRequest request) {
        if (request == null)
            return Response.status(Response.Status.BAD_REQUEST).build();

        // check credentials
        if (!securityManager.validCredentials(request.password))
            return Response.status(Response.Status.FORBIDDEN).build();

        // else
        return null;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/checkavailability")
    public Response checkAvailability(AvailabilityRequest request) {
        if (request == null)
            return Response.status(Response.Status.BAD_REQUEST).build();

        AvailabilityResponse response = roomManager.checkRoomAvailability(request);

        return Response.ok(response).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/booking")
    public Response bookRoom(BookingRequest request) {
        if (request == null)
            return Response.status(Response.Status.BAD_REQUEST).build();

        boolean success = roomManager.bookRoom(request);

        return Response.ok(success).build();
    }
}
