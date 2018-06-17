package models;

// TODO model from db
public class RoomType {
    private int id;
    private int numberOfRooms;
    private double prize;

    public RoomType(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public double getPrize() {
        return prize;
    }

    public void setPrize(double prize) {
        this.prize = prize;
    }

    public int getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }
}
