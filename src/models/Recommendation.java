package models;

//Recommendation helper class

import java.util.Date;

public class Recommendation {

    private int roomType;
    private Date startDate, endDate;

    public Recommendation(int roomType, Date startDate, Date endDate){
        this.roomType=roomType;
        this.startDate=startDate;
        this.endDate=endDate;

    }

    public int getRoomType() {
        return roomType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

}
