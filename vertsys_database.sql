CREATE SCHEMA `hotel_rooms` DEFAULT CHARACTER SET utf8mb4;

USE hotel_rooms;

CREATE TABLE `hotel_rooms`.`roomtypes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `price` DOUBLE NULL,
  `numberOfRooms` INT NULL,
  PRIMARY KEY (`id`)
);
  
CREATE TABLE `hotel_rooms`.`bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `roomtypeId` INT NOT NULL,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `arrivalDate` TIMESTAMP NULL,
  `departureDate` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (roomtypeId) REFERENCES roomtypes(id)
);
