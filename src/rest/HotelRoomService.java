package rest;

import com.sun.management.VMOption;
import communication.AdminRequest;
import communication.BookingRequest;
import controllers.HotelRoomManager;
import controllers.HotelSecurityManager;
import database.DatabaseRepository;
import database.DummyRepos;
import database.SqlRepos;
import models.RoomType;

import javax.annotation.PostConstruct;
import javax.naming.ldap.Control;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/hotelrooms")
public class HotelRoomService {
    private DummyRepos repos;

    public HotelRoomService() {
        repos = new DummyRepos();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        return Response.ok(repos.getRooms(), MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSingle(@PathParam("id") int id) {
        return Response.ok(repos.getRoom(id), MediaType.APPLICATION_JSON).build();
    }
}