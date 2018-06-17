package communication;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

@XmlRootElement
public class AvailabilityRequest {
    @XmlElement
    public int typeId;

    @XmlElement
    public Date startDate;

    @XmlElement
    public Date endDate;
}