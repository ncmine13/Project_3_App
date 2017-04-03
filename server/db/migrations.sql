CREATE DATABASE moodtracker;

\c moodtracker;

CREATE TABLE users (id SERIAL PRIMARY KEY, username varchar(255), password_digest varchar(255));
