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


    public boolean isEmpty() {
        return typeId < 0 &&
                startDate.equals(null) &&
                endDate.equals(null) &&
                firstName.equals(null) &&
                lastName.equals(null);
    }

    public boolean isInvalid() {

        return typeId < 0 ||
                startDate.equals(null) ||
                endDate.equals(null) ||
                firstName.equals(null) ||
                lastName.equals(null);
    }
}