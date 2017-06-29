DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  timestamp TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  album_id INTEGER REFERENCES albums,
  review TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT current_timestamp
);