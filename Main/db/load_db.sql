
-- CREATE 3 tables (department, role, employee)
-- department: id, name
-- role: id, title, salary, department_id
-- employee: id, first_name, last_name, role_id, manager_id

-- Select From * Department; 
SELECT * FROM department
LEFT JOIN role 
ON role.department_id = department.id
LEFT JOIN employee
On employee.role_id = role.id
LEFT JOIN employee
On employee.manager_id = employee.id

    
-- Select From * Role;
SELECT * FROM role
LEFT JOIN employee
ON employee.role_id = role.id
LEFT JOIN employee
ON employee.manager_id = employee.id

-- Select From * Employee;
SELECT * FROM employee
LEFT JOIN employee
ON employee.manager_id = employee.id


