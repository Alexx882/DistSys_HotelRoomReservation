package database;

import models.HotelRoom;
import models.RoomType;

import javax.xml.ws.spi.http.HttpExchange;
import java.util.ArrayList;
import java.util.List;

public class DummyRepos implements DatabaseRepository {
    @Override
    public List<HotelRoom> getRooms() {
        ArrayList<HotelRoom> lst = new ArrayList<>();
        lst.add(new HotelRoom(1));
        lst.add(new HotelRoom(2));
        return lst;
    }

    @Override
    public HotelRoom getRoom(int id) {
        if (id < 10)
            return new HotelRoom(id);
        else
            return null;
    }

    @Override
    public List<RoomType> getRoomTypes() {
        ArrayList<RoomType> lst = new ArrayList<>();
        lst.add(new RoomType(1));
        lst.add(new RoomType(2));
        return lst;
    }

    @Override
    public RoomType getRoomType(int id) {
        if (id < 10)
            return new RoomType(id);
        else
            return null;
    }
}
