CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR (500) UNIQUE NOT NULL,
    firstname VARCHAR (500) NOT NULL,
    lastname VARCHAR (500) NOT NULL,
    password VARCHAR (500) NOT NULL,
    phonenumber VARCHAR NOT NULL,
    createdon VARCHAR (500) NOT NULL,
    isadmin BOOLEAN NOT NULL
);


CREATE TABLE Buses
(
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL REFERENCES users(id),
    number_plate VARCHAR (500) UNIQUE NOT NULL,
    manufacturer VARCHAR (500) NOT NULL,
    model VARCHAR (500) NOT NULL,
    year VARCHAR (500) NOT NULL,
    capacity VARCHAR (500) NOT NULL,
    createdon VARCHAR (500) NOT NULL
);

CREATE TABLE Trips
(
    id SERIAL PRIMARY KEY,
    createduser INTEGER NOT NULL REFERENCES users(id),
    busid INTEGER NOT NULL,
    origin VARCHAR (500) NOT NULL,
    destination VARCHAR (500) NOT NULL,
    tripdate VARCHAR (500) NOT NULL,
    fare VARCHAR (500) NOT NULL,
    status VARCHAR (500) NOT NULL,
    createdon VARCHAR (500) NOT NULL
);
