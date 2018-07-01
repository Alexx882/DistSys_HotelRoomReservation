package communication;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class AdminRequest {
    @XmlElement
    public String password;

    @XmlElement
    public int typeId;

    @XmlElement
    public int numberOfRooms;

    @XmlElement
    public double price;

    @XmlElement
    public String name;
}
