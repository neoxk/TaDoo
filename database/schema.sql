-- Database and table creation
CREATE DATABASE IF NOT EXISTS tadoo;
USE tadoo;

-- Drop tables in correct order to handle foreign key dependencies
DROP TABLE IF EXISTS board_task_list;
DROP TABLE IF EXISTS board;
DROP TABLE IF EXISTS task_tag;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS task_list;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS user;

-- User table
CREATE TABLE user (
    user_id       INT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(25) NOT NULL,
    username      VARCHAR(20) NOT NULL,
    email         VARCHAR(40) NOT NULL,
    password_hash CHAR(60) NOT NULL
);

-- Tag table
CREATE TABLE tag (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    name   VARCHAR(20) NULL,
    color  VARCHAR(10) NULL
);

-- Task List table
CREATE TABLE task_list (
    task_list_id INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(40) NOT NULL
);

-- Task table
CREATE TABLE task (
    task_id      INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(30) NOT NULL,
    description  TEXT NULL,
    task_list_id INT NOT NULL,
    CONSTRAINT task_list_FK
        FOREIGN KEY (task_list_id) REFERENCES task_list (task_list_id)
);

-- Task Tag table
CREATE TABLE task_tag (
    task_tag_id INT AUTO_INCREMENT PRIMARY KEY,
    task_id     INT NOT NULL,
    tag_id      INT NOT NULL,
    CONSTRAINT task_tag_FK
        FOREIGN KEY (task_id) REFERENCES task (task_id),
    CONSTRAINT task_tag_FK1
        FOREIGN KEY (tag_id) REFERENCES tag (tag_id)
);

-- Board table (updated)
CREATE TABLE board (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(50) NOT NULL,
    user_id  INT NOT NULL,
    CONSTRAINT board_user_FK
        FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

-- Board Task List table
CREATE TABLE board_task_list (
    board_task_list_id INT AUTO_INCREMENT PRIMARY KEY,
    task_list_id       INT NOT NULL,
    board_id           INT NOT NULL,
    CONSTRAINT board_FK
        FOREIGN KEY (board_id) REFERENCES board (board_id),
    CONSTRAINT board_task_list_FK
        FOREIGN KEY (task_list_id) REFERENCES task_list (task_list_id)
);
