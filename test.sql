
CREATE DATABASE atholtonATCS;
/*CREATE TABLE teachers(
    id int NOT NULL,
    firstName varchar(30),
    curSize int NOT NULL,
    maxSize int NOT NULL,
    roomNumber int NOT NULL,
    className varchar(255),
    classBio varchar(MAX),
    PRIMARY KEY (ID)
)*/

CREATE TABLE rooms(
    room_num int NOT NULL,
    is_available boolean NOT NULL,
    capacity int NOT NULL,
    PRIMARY KEY (room_num)
)

create TABLE events(
    room_num int NOT NUll,
    title varchar(255) NOT NUll,
    description varchar(MAX) NOT NULL,
    start_time DATETIME  NOT NULL,
    end_time DATETIME NOT NULL,
    max_attendees int NOT NULL
)


--@block


