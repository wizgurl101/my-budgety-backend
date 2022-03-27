-- Database: my_budget

DROP DATABASE IF EXISTS my_budget;

CREATE DATABASE my_budget
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Canada.1252'
    LC_CTYPE = 'English_Canada.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS report_item;
DROP TABLE IF EXISTS report;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    country_code CHAR(2),
    region_code CHAR(2),
    city TEXT,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE report (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    name TEXT UNIQUE NOT NULL,
    month_name TEXT NOT NULL,
    year INT NOT NULL,
    border_color TEXT,
    budget INT,
    type TEXT,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
            REFERENCES users(id)
);


CREATE TABLE report_item (
    id SERIAL PRIMARY KEY NOT NULL,
    report_id INT NOT NULL,
    name TEXT NOT NULL,
    item_date DATE NOT NULL DEFAULT CURRENT_DATE,
    amount FLOAT(25) NOT NULL,
    CONSTRAINT fk_report 
        FOREIGN KEY(report_id) 
            REFERENCES report(id)
);