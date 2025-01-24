CREATE DATABASE shopypal;

USE shopypal;

CREATE TABLE roles
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_profiles
(
    id        CHAR(36) PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname  VARCHAR(100) NOT NULL,
    role_id   INT          NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_credentials
(
    id       CHAR(36) PRIMARY KEY,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES user_profiles (id) ON DELETE CASCADE ON UPDATE CASCADE
);