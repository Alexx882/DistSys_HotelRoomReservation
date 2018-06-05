package models;

// TODO model from db
public class RoomType {
    private int id;
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
}
