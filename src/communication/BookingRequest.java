package communication;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

@XmlRootElement
public class BookingRequest {
    @XmlElement
    public int typeId;

    @XmlElement
    public Date startDate;

    @XmlElement
    public Date endDate;

    @XmlElement
    public String firstName;

    @XmlElement
    public String lastName;
}
