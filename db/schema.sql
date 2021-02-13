DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
    -- FOREIGN KEY(role_id)
    -- REFERENCES role(id),
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)

);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Ron", "Paul", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Frederick", "Douglas", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Tulsi", "Gabbard", 4, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Mos", "Def", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Chester", "Bennington", 5, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Seth", "Gerlach", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Gary", "Oldman", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Harry", "Potter", 1, 1 );
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Robert", "Pattinson", 1, 1);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
  -- FOREIGN KEY(department_id)
  -- REFERENCES department(id)
);
insert into role(title, salary, department_id) values('Manager', 5000000, 1);
insert into role(title, salary, department_id) values('Engineer', 1000000, 2);
insert into role(title, salary, department_id) values('Accountant', 4000000, 3);
insert into role(title, salary, department_id) values('Designer', 3000000, 4);
insert into role(title, salary, department_id) values('Administration', 2000000, 5);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
insert into department(name)
values ('Management'),
       ('Engineering'),
       ('Accounting'),
       ('Marketing'),
       ('Human Resources');

