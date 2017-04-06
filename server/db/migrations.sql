-- CREATE DATABASE moodtracker;

\c moodtracker;

CREATE TABLE users (id SERIAL PRIMARY KEY, username varchar(255), password_digest varchar(255), postSubmitted varchar(30));

CREATE TABLE moods
	(id SERIAL PRIMARY KEY,
	word1 varchar(255),
	word2 varchar(255),
	word3 varchar(255),

	worst varchar(255),
	best varchar(255),
	worry varchar(255),
	confidence INT,
	satisfaction INT,
	stress INT,
	sadness INT,
	anger INT,
	happiness INT,
	funny INT,

	thing1 varchar(255),
	thing2 varchar(255),
	thing3 varchar(255),

	user_id INT references users(id));
