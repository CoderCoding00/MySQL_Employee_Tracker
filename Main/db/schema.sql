DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- Create the department table 
CREATE TABLE department (
  -- auto_increment increases the id by 1 every time based on the history of insertions
  -- primary key identifies each row uniquely.
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- varchar 30 means max size is 30 characters. Not Null means it can not be empty. 
  name VARCHAR(30) NOT NULL
);

-- Create the role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- Create the employee table 
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    -- manager_id to hold reference to another employee 
    -- that is the manager of the current employee 
    -- (`null` if the employee has no manager
    manager_id INT,
    FOREIGN KEY (role_id) 
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id)
    ON DELETE SET NULL
);
