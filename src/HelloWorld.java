import communication.BookingRequest;
import jdk.nashorn.internal.objects.annotations.Getter;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;

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
        BookingRequest r = new BookingRequest();
        r.typeId = 2;
        r.firstName = "peter";
        r.lastName = "bauer";
        r.startDate = new Date();
        r.endDate = new Date();

        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }
}