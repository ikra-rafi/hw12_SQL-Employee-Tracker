-- DROP DATABASE IF EXISTS employee_tracker;
-- CREATE DATABASE employee_tracker;

-- USE employee_tracker;

-- CREATE TABLE employees (
--   id INT NOT NULL AUTO_INCREMENT,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INT,
--   manager_id INT,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE role (
--   id INT NOT NULL AUTO_INCREMENT,
--   title VARCHAR(30) NOT NULL,
--   salary DECIMAL NOT NULL,
--   department_id INT,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE department (
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(30) NOT NULL,
--   PRIMARY KEY (id)
-- );


DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
    -- FOREIGN KEY(role_id)
    -- REFERENCES role(id),
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)

);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Ryan", "Salamone", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Mickey", "Mouse", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Lou", "Sal", 4, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Elvis", "Presely", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jerry", "Garcia", 5, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Bobby", "Weir", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Phil", "LEsh", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Bill", "The Drummer", 1, 1 );
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Mickey", "Hart", 1, 1);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
  -- FOREIGN KEY(department_id)
  -- REFERENCES department(id)
);
insert into role(title, salary, department_id) values('Manager', 221032, 1);
insert into role(title, salary, department_id) values('Engineer', 32032, 2);
insert into role(title, salary, department_id) values('Sales', 2032, 3);
insert into role(title, salary, department_id) values('SOC', 1032, 4);
insert into role(title, salary, department_id) values('Administration', 2212, 5);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
insert into department(name)
values ('Management'),
       ('Engineering'),
       ('Sales'),
       ('Operations'),
       ('Human Resources');

