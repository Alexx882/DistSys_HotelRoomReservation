package rest;

import communication.AdminRequest;
import communication.AvailabilityRequest;
import communication.AvailabilityResponse;
import communication.BookingRequest;
import controllers.HotelRoomManager;
import controllers.HotelSecurityManager;
import database.DatabaseRepository;
import database.DummyRepos;
import database.SqlRepos;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/roomtypes")
public class RoomTypeService {
    private SqlRepos repos;
    private HotelSecurityManager securityManager;
    private HotelRoomManager roomManager;

    public RoomTypeService() {
        repos = new SqlRepos();
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
    public Response setAvailabilty(AdminRequest request) {
        if (request == null)
            return Response.status(Response.Status.BAD_REQUEST).build();

        // check credentials
        if (!securityManager.validCredentials(request.password))
            return Response.status(Response.Status.FORBIDDEN).build();

        // update the information as desired
        roomManager.updateRoomProperties(request.typeId, request.numberOfRooms, request.prize);

        // return 204
        return Response.noContent().build();
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
