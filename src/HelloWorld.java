import communication.BookingRequest;
import database.SqlRepos;
import jdk.nashorn.internal.objects.annotations.Getter;
import models.BookingsEntity;
import models.RoomtypesEntity;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.Calendar;
import java.sql.Date;

// The Java class will be hosted at the URI path "/helloworld"
@Path("")
public class HelloWorld {
    // The Java method will process HTTP GET requests
    @GET
    @Produces({MediaType.TEXT_HTML})
    public String viewHome()throws FileNotFoundException
    {
        return "HotelRoomManager startpage."
                + "<br />"
                + "<a href=http://localhost:8080/test.html>startpage from moedi</a>";
    }

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public Response test() {
        SqlRepos repos = new SqlRepos();

        RoomtypesEntity r = repos.getRoomType(1);



        /*
        BookingRequest r = new BookingRequest();
        r.typeId = 2;
        r.firstName = "peter";
        r.lastName = "bauer";
        r.startDate = new Date();
        r.endDate = new Date();
        */
        //RoomtypesEntity r1 = new RoomtypesEntity();
        //r1.setPrice(15);
        //r1.setName("Testinsert");
        //r1.setNumberOfRooms(15);
        //repos.updateRoomType(r1);



        //  repos.deleteRoomType(0);
        //BookingsEntity b = new BookingsEntity();
        //b.setFirstname("Philipp");
        //b.setLastname("Mödritscher");
        //b.setArrivalDate(new Timestamp(System.currentTimeMillis()));
        //b.setDepartureDate(new Timestamp(System.currentTimeMillis()));
       // repos.book(b);
        BookingsEntity b1 = repos.getBookings().get(0);
        return Response.ok(b1, MediaType.APPLICATION_JSON).build();
    }
}