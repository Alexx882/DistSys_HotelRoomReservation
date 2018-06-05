package database;

import models.HotelRoom;
import models.RoomType;

import java.util.List;

public interface DatabaseRepository {

    public List<HotelRoom> getRooms();

    public HotelRoom getRoom(int id);

    public List<RoomType> getRoomTypes();

    public RoomType getRoomType(int id);
}
