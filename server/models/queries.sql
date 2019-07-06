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