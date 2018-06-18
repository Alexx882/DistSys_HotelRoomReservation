package database;


import models.BookingsEntity;
import models.RoomType;
import models.RoomtypesEntity;
import org.hibernate.Query;
import org.hibernate.classic.Session;

import java.util.List;

public class SqlRepos  {




    public List<RoomtypesEntity> getRoomTypes() {
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();

        Query q = session.createQuery("From roomtypes ");
        List<RoomtypesEntity> rooms;
        rooms=q.list();
        session.getTransaction().commit();
        session.close();


        return rooms;


    }


    //@Override
    public RoomType getRoomType(int id) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();

        Query q = session.createQuery("From roomtypes r where r.id="+id);
        List<RoomtypesEntity> rooms;
        rooms=q.list();
        session.getTransaction().commit();
        session.close();


        //return rooms.get(0);
        return null;

    }

    //roomtype update

    //delete
    public void updateRoomType(int id,RoomtypesEntity r) {

            Session session = HibernateUtil.getSessionFactory().openSession();

            session.beginTransaction();

            session.saveOrUpdate(r);
            session.getTransaction().commit();
            session.close();


    }

    public void deleteRoomType(int id) {

            Session session = HibernateUtil.getSessionFactory().openSession();

            session.beginTransaction();

            Query q = session.createQuery("delete from roomtypes r where r.id=" + id);

            q.executeUpdate();
            session.getTransaction().commit();
            session.close();



    }


    public List<BookingsEntity> getBookings() {
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();

        Query q = session.createQuery("From bookings ");
        List<BookingsEntity> bookings;
        bookings=q.list();
        session.getTransaction().commit();
        session.close();


        return bookings;


    }

    public void book(BookingsEntity b) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();

        session.save(b);
        session.getTransaction().commit();
        session.close();


    }











}
