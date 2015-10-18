drop database myFunctionalDB;
create database myFunctionalDB;
use myFunctionalDB;

CREATE TABLE Program(
       PID smallint unsigned auto_increment not null, 
       pName varchar(30),
       PRIMARY KEY (PID)
       ) ENGINE InnoDB;

CREATE TABLE Department(
       DID smallint unsigned auto_increment not null,
       dName varchar(30),
       dCode varchar(4),
       building int(2),
       roomNum int (4),
       PID smallint unsigned not null,
       PRIMARY KEY (DID),
       INDEX (PID), 
       FOREIGN KEY (PID) REFERENCES Program (PID) ON UPDATE CASCADE
       ON DELETE CASCADE
       ) ENGINE InnoDB;

CREATE TABLE Student(
       SID integer unsigned auto_increment not null,
       fName varchar(16),
       lName varchar(16),
       mName varchar(16),
       email varchar(60),
       netID varchar(40),
       gender bit,
       bDate date,
       phoneNum integer,
       address varchar(100),
       password varchar(50),
       initDate date,
       modDate timestamp,
       gpa decimal(2,1),
       major smallint unsigned not null,
       minor smallint unsigned not null,
       program smallint unsigned not null,
       PRIMARY KEY(SID),
       INDEX (major),
       FOREIGN KEY (major) REFERENCES Department (DID) ON UPDATE CASCADE
       ON DELETE CASCADE,
       INDEX (minor),
       FOREIGN KEY (minor) REFERENCES Department (DID) ON UPDATE CASCADE
       ON DELETE CASCADE,
       INDEX (program),
       FOREIGN KEY (program) REFERENCES Program (PID) ON UPDATE CASCADE
       ON DELETE CASCADE
       ) ENGINE InnoDB;       

CREATE TABLE Employee(
       EID integer unsigned auto_increment not null,
       fName varchar(16),
       lName varchar(16),
       mName varchar(16),
       email varchar(60),
       netID varchar(40),
       gender bit,
       bDate date,
       phoneNum integer,
       address varchar(100),
       password varchar(50),
       initDate date,
       modDate timestamp,
       sin int(10),
       salary int(10),
       duty varchar(20),
       DID smallint unsigned not null,
       PRIMARY KEY (EID),
       INDEX (DID),
       FOREIGN KEY (DID) REFERENCES Department (DID) ON UPDATE CASCADE
       ON DELETE CASCADE
       )  ENGINE InnoDB;

						 
CREATE TABLE Course(
       CID integer unsigned auto_increment not null,
       title varchar(20),
       description varchar(256),
       career int(1), /*only a few options, identify by number*/
       division varchar(10),
       termStart date,
       termEnd date,
       classType int(1), /*1 = lec, 2 = lab, 3 = sem*/
       DID smallint unsigned not null,
       prof integer unsigned not null,
       PRIMARY KEY (CID),
       INDEX (DID), 
       FOREIGN KEY (DID) REFERENCES Department (DID) ON UPDATE CASCADE
       ON DELETE CASCADE,
       INDEX (prof),
       FOREIGN KEY (prof) REFERENCES Employee (EID) ON UPDATE CASCADE
       ON DELETE CASCADE
       ) ENGINE InnoDB;
            
CREATE TABLE Prereq(
       CID integer unsigned not null,
       PCID integer unsigned not null,
       FOREIGN KEY (CID) REFERENCES Course (CID) ON UPDATE CASCADE
       ON DELETE CASCADE,
       FOREIGN KEY (PCID) REFERENCES Course (CID) ON UPDATE CASCADE
       ON DELETE CASCADE
       ) ENGINE InnoDB;

CREATE TABLE CourseTaken(
       SID integer unsigned not null,	
       CID integer unsigned not null,
       FOREIGN KEY (SID) REFERENCES Student (SID) ON UPDATE CASCADE
       ON DELETE CASCADE,
       FOREIGN KEY (CID) REFERENCES Course (CID) ON UPDATE CASCADE 
       ON DELETE CASCADE
       ) ENGINE InnoDB;

CREATE TABLE ProfDept(
       EID integer unsigned not null,
       DID smallint unsigned not null,	
       FOREIGN KEY (EID) REFERENCES Employee (EID) ON UPDATE CASCADE
       ON DELETE CASCADE,
       FOREIGN KEY (DID) REFERENCES Department (DID) ON UPDATE CASCADE 
       ON DELETE CASCADE
       ) ENGINE InnoDB;
