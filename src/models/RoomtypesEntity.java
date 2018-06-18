package models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "roomtypes", schema = "hotel_rooms", catalog = "")
public class RoomtypesEntity {
    private int id;
    private String name;
    private int price;
    private Integer numberOfRooms;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "price")
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Basic
    @Column(name = "numberOfRooms")
    public Integer getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(Integer numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoomtypesEntity that = (RoomtypesEntity) o;
        return id == that.id &&
                price == that.price &&
                Objects.equals(name, that.name) &&
                Objects.equals(numberOfRooms, that.numberOfRooms);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, price, numberOfRooms);
    }
}
