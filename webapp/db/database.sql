CREATE DATABASE shopypal;

USE shopypal;

CREATE TABLE roles
(
    id   CHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE user_profiles
(
    id        CHAR(36) PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname  VARCHAR(100) NOT NULL,
    FOREIGN KEY (id) REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE user_credentials
(
    id       CHAR(36) PRIMARY KEY,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES user_profiles (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE products
(
    id                  INT PRIMARY KEY AUTO_INCREMENT NOT NULL ,
    name                TINYTEXT NOT NULL,
    description         TEXT NOT NULL,
    image               varchar(100),
    price               INT NOT NULL,
    quantityLeft        INT NOT NULL,
    category            varchar(32) NOT NULL,
    promotionPercentage INT
)