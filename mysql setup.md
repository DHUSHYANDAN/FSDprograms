USE eventDB;
CREATE TABLE new_events (
id int  NOT NULL auto_increment primary key ,
    name varchar(250) not null,
    registration_number VARCHAR(255 ) NOT NULL  ,
    dept VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    description varchar(250)
);

ALTER TABLE new_events
ADD CONSTRAINT registration_number UNIQUE (registration_number);

DROP TABLES new_events;




SHOW TABLES;
DESCRIBE new_events;
SELECT * FROM new_events;
DELETE from new_events where name="chan";


step 1:Install Mysql and create password = kvcet1234
step 2:Create the database Name command="create database new_events"
step 3:CREATE TABLE new_events (
id int  NOT NULL auto_increment primary key ,
    name varchar(250) not null,
    registration_number VARCHAR(255 ) NOT NULL  ,
    dept VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    description varchar(250)
);
step 4: view table command="DESCRIBE new_events;"
step 5: delete one form table command="DELETE from new_events where name="chan";"


