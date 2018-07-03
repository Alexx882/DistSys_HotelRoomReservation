package database;


import models.BookingsEntity;
import models.RoomtypesEntity;
import org.hibernate.Query;
import org.hibernate.classic.Session;

import java.util.List;

public class SqlRepos  {




    public List<RoomtypesEntity> getRoomTypes() {
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();

        Query q = session.createQuery("From models.RoomtypesEntity ");
        List<RoomtypesEntity> rooms;
        rooms=q.list();
        session.getTransaction().commit();
        session.close();


        return rooms;


    }


    //@Override
    public RoomtypesEntity getRoomType(int id) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();

        Query q = session.createQuery("From models.RoomtypesEntity r where r.id="+id);
        List<RoomtypesEntity> rooms;
        rooms=q.list();
        session.getTransaction().commit();
        session.close();

        return rooms.get(0);

    }

    //roomtype update

    //delete
    public void updateRoomType(RoomtypesEntity r) {

            Session session = HibernateUtil.getSessionFactory().openSession();

            session.beginTransaction();

            session.saveOrUpdate(r);
            session.getTransaction().commit();
            session.close();


    }

    public void deleteRoomType(int id) {

            Session session = HibernateUtil.getSessionFactory().openSession();

            session.beginTransaction();

            Query q = session.createQuery("delete from models.RoomtypesEntity r where r.id=" + id);

            q.executeUpdate();
            session.getTransaction().commit();
            session.close();



    }


    public List<BookingsEntity> getBookings() {
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();

        Query q = session.createQuery("From models.BookingsEntity ");
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


