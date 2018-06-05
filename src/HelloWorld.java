import communication.BookingRequest;
import jdk.nashorn.internal.objects.annotations.Getter;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Calendar;
import java.util.Date;

// The Java class will be hosted at the URI path "/helloworld"
@Path("")
public class HelloWorld {
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media type "text/plain"
    @Produces("text/plain")
    public String getClichedMessage() {
        // Return some cliched textual content
        return "Hotel Room Manager entry point.";
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