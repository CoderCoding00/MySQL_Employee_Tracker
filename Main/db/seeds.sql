--formatted table showing employee data, including employee ids, 
-- first names, last names, job titles, departments, salaries, and managers
-- that the employees report to

USE employee_db;
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

-- Insert into Role (job title (role), salary, dept id)
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);
       
-- Insert into emplyee (first_name, last_name, role id, manager id)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1),
       ("Jane", "Doe", 2, 1),
       ("Jim", "Jackson", 3, 2),
       ("David", "Davidson", 4, 2),
       ("Robert", "Robinson", 5, 3),
       ("James", "Hall", 6, 4),
       ("Jenny", "Johnson", 7, 4);