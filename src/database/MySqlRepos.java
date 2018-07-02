package database;

import models.BookingsEntity;
import models.RoomtypesEntity;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MySqlRepos /*implements DatabaseRepository */ {

    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private String limaDbUrl = "jdbc:mysql://sql7.freemysqlhosting.net:3306/sql7245736?user=sql7245736&password=eUBpvf4YCy";

    private Connection getConnection() throws SQLException {
        conn = DriverManager.getConnection(limaDbUrl);
        return conn;
    }

    public void connect() {
        try {
            getConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    //@Override
    public List<RoomtypesEntity> getRoomTypes() {


        String sql = "SELECT * FROM roomtypes";

        try {
            conn = getConnection();

            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);

            List<RoomtypesEntity> rtlist = new ArrayList<>();

            while (rs.next()) {
                int roomtypeId = rs.getInt("id");
                String name = rs.getString("name");
                double price = rs.getFloat("price");
                int numberOfRooms = rs.getInt("numberOfRooms");

                RoomtypesEntity rt = new RoomtypesEntity();
                rt.setId(roomtypeId);
                rt.setName(name);
                rt.setNumberOfRooms(numberOfRooms);
                rt.setPrice(price);
                rtlist.add(rt);

                System.out.println(roomtypeId + " " + name + " " + price + " " + numberOfRooms);
            }


        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;

    }

    //@Override
    public RoomtypesEntity getRoomType(int id) {

        String sql = "SELECT * FROM roomtypes WHERE id=" + id + "";

        try {
            conn = getConnection();

            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);

            if (rs.next()) {

                int roomtypeId = rs.getInt("id");
                String name = rs.getString("name");
                double price = rs.getFloat("price");
                int numberOfRooms = rs.getInt("numberOfRooms");

                System.out.println(roomtypeId + " " + name + " " + price + " " + numberOfRooms);

                RoomtypesEntity roomType = new RoomtypesEntity();
                roomType.setId(roomtypeId);
                roomType.setPrice(price);
                roomType.setNumberOfRooms(numberOfRooms);
                roomType.setName(name);
                return roomType;

            } else {
                return null;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public void updateRoomType(RoomtypesEntity r) {

        String sql = "UPDATE roomtypes " +
                "SET name='"+r.getName()+"', price="+r.getPrice()+", numberOfRooms="+r.getNumberOfRooms()+" "+
                "WHERE id="+r.getId();
        debugMsg(sql);

        try {
            sqlUpdate(sql);
        }catch (SQLException e){
            e.printStackTrace();
        }


    }

    public void deleteRoomType(int id) {

        String sql = "DELETE FROM roomtypes WHERE id="+id;

        try{
            conn = getConnection();
            stmt = conn.createStatement();
            stmt.executeUpdate(sql);
        } catch (SQLException e){
            e.printStackTrace();
        }

    }

    public int addRoomType(RoomtypesEntity rte) {

        String sql = "INSERT INTO roomtypes (name,price,numberOfRooms) VALUES ('"+rte.getName()+"',"+rte.getPrice()+","+rte.getNumberOfRooms()+")";

        int roomtypeId=-1;

        try{
            roomtypeId=sqlUpdate(sql);
            debugMsg("Insertion into roomtypes successful: "+rte.getName()+" "+rte.getPrice()+" "+rte.getNumberOfRooms());
        } catch (SQLException e){
            e.printStackTrace();
        }

        return roomtypeId;

    }

    public List<BookingsEntity> getBookings() {
        List<BookingsEntity> bookings=null;

        String sql = "SELECT * FROM bookings";

        try {
            rs = sqlQuery(sql);

            bookings = new ArrayList<>();

            while (rs.next()) {
                int bookingId = rs.getInt("id");
                int roomtypeId = rs.getInt("roomtypeId");
                String firstname = rs.getString("firstname");
                String lastname = rs.getString("lastname");
                Timestamp arrivalDate = rs.getTimestamp("arrivalDate");
                Timestamp departureDate = rs.getTimestamp("departureDate");

                BookingsEntity be = new BookingsEntity();
                be.setId(bookingId);
                be.setRoomtypeId(roomtypeId);
                be.setFirstname(firstname);
                be.setLastname(lastname);
                be.setArrivalDate(arrivalDate);
                be.setDepartureDate(departureDate);

                debugMsg(bookingId+" "+roomtypeId + " " + firstname + " " + lastname + " " + arrivalDate+" "+departureDate);

                bookings.add(be);
            }


        } catch (SQLException e) {
            e.printStackTrace();
        }

        return bookings;
    }

    public void book(BookingsEntity b) {

        String sql = "INSERT INTO bookings (roomtypeId,firstname,lastname,arrivalDate,departureDate)" +
                "VALUES ('"+b.getRoomtypeId()+"','"+b.getFirstname()+"','"+b.getLastname()+"','"+b.getArrivalDate()+"','"+b.getDepartureDate()+"')";

        try {
            sqlUpdate(sql);
            System.out.println("Successfully bookes: "+b.toString());

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }


    private int sqlUpdate(String sql) throws SQLException {
        conn = getConnection();
        stmt = conn.createStatement();
        int id=-1;


        stmt.executeUpdate(sql,Statement.RETURN_GENERATED_KEYS);

        rs = stmt.getGeneratedKeys();

        if (rs.next()){
            id = rs.getInt(1);
            debugMsg("Inserted ID: "+id);
        }

        return id;

    }

    private ResultSet sqlQuery(String sql) throws SQLException {
        conn = getConnection();

        stmt = conn.createStatement();
        ResultSet tmp = stmt.executeQuery(sql);
        return tmp;
    }


    private void debugMsg(String msg){

        System.out.println(msg);
    }


}
