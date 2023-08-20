-- drop database plant_proj;
create database plant_proj;
use plant_proj;

CREATE TABLE Plant(
	plantNo VARCHAR(4),
    type VARCHAR(25),
    PRIMARY KEY(plantNo)
);

create Table Lecture(
	lectureNo int AUTO_INCREMENT, 
    plantNo VARCHAR(4),
    dia DATE,
    hora TIME,
    humedad float,
    temp_int float,
    humedad_out float,
    luz_solar float,
    PRIMARY KEY(lectureNo, plantNo),
    CONSTRAINT fk_Lecture_Plant1
		FOREIGN KEY(plantNo) REFERENCES Plant(plantNo)
);

CREATE TABLE Client(
	clientNo VARCHAR(4),
    fName VARCHAR(10),
    lName VARCHAR(10),
    sex VARCHAR(1),
    telNo VARCHAR(15),
    PRIMARY KEY(clientNo)
);

CREATE TABLE Branch(
	branchNo VARCHAR(4),
    street VARCHAR(20),
    city VARCHAR(10),
    postcode VARCHAR(10),
    PRIMARY KEY(branchNo)
);

CREATE TABLE Staff(
	staffNo VARCHAR(4),
    fName VARCHAR(10),
    lName VARCHAR(10),
    position VARCHAR(10),
    sex VARCHAR(1),
    salary DOUBLE,
    branchNo VARCHAR(4),
    PRIMARY KEY(staffNo, branchNo),
    CONSTRAINT fk_Staff_Branch1
		FOREIGN KEY(branchNo) REFERENCES Branch(branchNo)
);

CREATE TABLE Registration(
	registrationNo VARCHAR(5),
	clientNo VARCHAR(4),
    branchNo VARCHAR(4),
    staffNo VARCHAR(4),
    plantNo VARCHAR(4),
    dateShopping DATE,
    PRIMARY KEY(registrationNo, clientNo, branchNo, staffNo,plantNo),
    CONSTRAINT fk_Registration_Clientt1
		FOREIGN KEY(clientNo) REFERENCES Client(clientNo),
	CONSTRAINT fk_Registration_Branch1
		FOREIGN KEY(branchNo) REFERENCES Branch(branchNo),
	CONSTRAINT fk_Registration_Staff1
		FOREIGN KEY(staffNo) REFERENCES Staff(staffNo),
	CONSTRAINT fk_Registrarion_Plant1
		FOREIGN KEY(plantNo) REFERENCES Plant(plantNo)
);

INSERT INTO Plant(plantNo, type) VALUES ("P005","violeta_africana");

SELECT * FROM Lecture;
SELECT * FROM Lecture ORDER BY lectureNo DESC LIMIT 1;



