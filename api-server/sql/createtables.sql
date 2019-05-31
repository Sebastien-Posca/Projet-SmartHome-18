DROP DATABASE IF EXISTS declDB;
CREATE DATABASE declDB;
USE declDB;

CREATE TABLE locations
(
	locationId INT PRIMARY KEY AUTO_INCREMENT,
	locationName VARCHAR(30),
	locationPictureUrl VARCHAR(60)
);

CREATE TABLE incidentTypes
(
	typeId INT PRIMARY KEY AUTO_INCREMENT,
	typeName VARCHAR(30)
);

CREATE TABLE commentaries
(
	commentId INT PRIMARY KEY AUTO_INCREMENT,
	incidentId INT,
	commentText TEXT,
	authorId INT,
	date DATE,
	hour TIME
);

CREATE TABLE incidents
(
	incidentId INT PRIMARY KEY AUTO_INCREMENT,
	incidentDate DATE,
	incidentHour TIME,
	declDate DATE,
	declhour TIME,
	locationid INT,
	FOREIGN KEY(locationId) REFERENCES locations(locationId),
	importance INT,
	reporterId INT,
	title VARCHAR(30),
	description TEXT,
	typeId INT,
	FOREIGN KEY(typeId) REFERENCES incidentTypes (typeId),
	status INT DEFAULT 0
);

CREATE TABLE users
(
	userId INT PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(30) UNIQUE,
	userPictureUrl VARCHAR(60),
	passwordHash CHAR(32),
	admin BOOL
);

CREATE TABLE assignations
(
	incidentId INT,
	userId INT,
	FOREIGN KEY(incidentId) REFERENCES incidents(incidentId),
	FOREIGN KEY(userId) REFERENCES users(userId),
	PRIMARY KEY(incidentId, userId)
);

INSERT INTO locations (locationName, locationpictureUrl) VALUES ("maison", "/pictures/maison.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("hall", "/pictures/hall.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("salon", "/pictures/salon.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("cuisine", "/pictures/cuisine.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("chambre parents", "/pictures/chambreParents.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("chambre Clara", "/pictures/chambreClara.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("chambre Thomas", "/pictures/chambreThomas.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("jardin", "/pictures/jardin.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("garage", "/pictures/garage.jpg");
INSERT INTO locations (locationName, locationpictureUrl) VALUES ("salle de bain", "/pictures/garage.jpg");


INSERT INTO incidenttypes (typeName) VALUES ("autre");
INSERT INTO incidenttypes (typeName) VALUES ("courses");
INSERT INTO incidenttypes (typeName) VALUES ("panne appareil");
INSERT INTO incidenttypes (typeName) VALUES ("catastrophe");

INSERT INTO users (userName,passwordHash,admin, userpictureUrl) VALUES ("Home", "0afca49306b28c1650a1d4130a6a0ce1",false, "/pictures/home.jpg");
INSERT INTO users (userName,passwordHash,admin, userpictureUrl) VALUES ("Thomas", "2042101ac1f6e7741bfe43f3672e6d7c",false, "/pictures/thomas.jpg");
INSERT INTO users (userName,passwordHash,admin, userpictureUrl) VALUES ("Clara", "0afca49306b28c1650a1d4130a6a0ce1",false, "/pictures/clara.jpg");
INSERT INTO users (userName,passwordHash,admin, userpictureUrl) VALUES ("Bob", "0afca49306b28c1650a1d4130a6a0ce1",false, "/pictures/bob.jpg");



INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-25', '11:45', '1', '2', '2', 'Feuilles imprimantes', 'Acheter feuilles pour l\'imprimantes format A4', '2','3');

INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-25', '11:45', '1', '2', '2', 'Feuilles imprimantes', 'Acheter feuilles pour l\'imprimantes format A4', '2','3');


INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-25', '11:45', '1', '2', '2', 'Feuilles imprimantes', 'Acheter feuilles pour l\'imprimantes format A4', '2','3');


INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-25', '11:45', '1', '1', '2', 'Feuilles imprimantes', 'Acheter feuilles pour l\'imprimantes format A4', '2','3');

INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-02-05', '11:45', '8', '2', '2','robinet jardin', 'Le robinet à l’arrière du jardin goutte un peu', '3','2');

INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-02-05', '11:45', '8', '2', '2','test appli incident', '', '3','0');

INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-05', '11:45', '8', '2', '2','Couper haie', '', '3','3');

INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-05', '11:45', '8', '1', '2','Couper haie', '', '3','3');

INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-05', '11:45', '8', '1', '2','Couper haie', '', '3','3');

INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-05', '11:45', '8', '1', '2','Couper haie', '', '3','3');

INSERT INTO incidents (incidentDate, incidentHour, locationID, importance, reporterID, title, description, typeId, status)
VALUES ('2018-03-05', '11:45', '8', '1', '2','Couper haie', '', '3','3');

INSERT INTO assignations VALUES (5, 4);
INSERT INTO assignations VALUES (7, 4);
INSERT INTO assignations VALUES (8, 4);
INSERT INTO assignations VALUES (9, 4);
INSERT INTO assignations VALUES (10, 4);
INSERT INTO assignations VALUES (11, 4);
