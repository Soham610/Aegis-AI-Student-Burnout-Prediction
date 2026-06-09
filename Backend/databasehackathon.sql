CREATE DATABASE student_risk;
USE student_risk;

CREATE TABLE student_logs (
id INT AUTO_INCREMENT PRIMARY KEY,
roll_no VARCHAR(50),
name VARCHAR(100),
attendance FLOAT,
assignment_completion FLOAT,
sleep_hours FLOAT,
stress_level INT,
screen_time FLOAT,
cgpa FLOAT,
risk_probability FLOAT,
risk_level VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SHOW TABLES;
DESCRIBE student_logs;

SELECT DATABASE();

USE student_risk;
SHOW TABLES;
DESCRIBE student_logs;

DROP TABLE student_logs;

CREATE TABLE student_logs (
id INT AUTO_INCREMENT PRIMARY KEY,
roll_no VARCHAR(50),
name VARCHAR(100),
attendance FLOAT,
assignment_completion FLOAT,
sleep_hours FLOAT,
stress_level INT,
screen_time FLOAT,
cgpa FLOAT,
risk_probability FLOAT,
risk_level VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);