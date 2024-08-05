create database companyDB;
use companydb;
create table employee(emp_id int primary key  auto_increment,firstname varchar(50),
lastname varchar(50));
CREATE TABLE HoursWorked (
    RecordID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeID INT,
    AttractionID INT,
    DateWorked DATE,
    HoursWorked FLOAT,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(emp_id)
);

INSERT INTO Employee (FirstName, LastName) VALUES
('John', 'Doe'),
('Jane', 'Smith'),
('Alice', 'Johnson');

INSERT INTO HoursWorked (EmployeeID, AttractionID, DateWorked, HoursWorked) VALUES
(1, 101, '2024-08-01', 5.5),
(1, 102, '2024-08-02', 6.0),
(2, 101, '2024-08-01', 7.0),
(3, 102, '2024-08-02', 4.0),
(3, 101, '2024-08-01', 5.0);

SELECT 
    e.FirstName,
    e.LastName,
    h.DateWorked,
    h.HoursWorked - sub.AverageHours AS DIFFERENCE,
    sub.AverageHours AS AVERAGE
FROM 
    Employee e
JOIN 
    HoursWorked h ON e.Emp_ID = h.EmployeeID
JOIN (
    SELECT 
        AttractionID,
        AVG(HoursWorked) AS AverageHours
    FROM 
        HoursWorked
    GROUP BY 
        AttractionID
) sub ON h.AttractionID = sub.AttractionID;


