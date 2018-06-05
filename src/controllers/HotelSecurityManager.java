package controllers;

public class HotelSecurityManager {
    // TODO
    public boolean validCredentials(String password) {
        return password != null || password.equals("admin");
    }
}
