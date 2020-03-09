DROP DATABASE IF EXISTS weather;
CREATE DATABASE weather;
USE weather;

CREATE TABLE locations
(
  locations_id INT NOT NULL AUTO_INCREMENT,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  PRIMARY KEY (locations_id)
);

CREATE TABLE notes
(
  temperature DOUBLE NOT NULL,
  cloudiness VARCHAR(100) NOT NULL,
  humidity DOUBLE NOT NULL,
  notes_id INT NOT NULL AUTO_INCREMENT,
  dtime DATETIME NOT NULL,
  locations_id INT NOT NULL,
  PRIMARY KEY (notes_id),
  FOREIGN KEY (locations_id) REFERENCES locations(locations_id)
);

INSERT INTO locations (city, address) VALUES ('Helsinki', 'Kaisaniemi');
INSERT INTO locations (city, address) VALUES ('Espoo', 'Tapiola');
INSERT INTO notes (temperature, cloudiness, humidity, dtime, locations_id) VALUES (2.0, 'Pilvistä', 80.0, '2019-06-18 10:34:09', 1);
INSERT INTO notes (temperature, cloudiness, humidity, dtime, locations_id) VALUES (6.0, 'Pilvistä', 76.0, '2020-07-04 16:44:56', 2);