// create "const connection" to refer to connection.js file
const connection = require("./connection");

class DB {

    // Keep reference to the connection referring to the same object called connection. 
    constructor(connection) {
        this.connection = connection;
    }
    // Find all departments
    findAllDepartments() {
        return this.connection.promise().query
            (
                "SELECT department.id, department.name FROM department;"
            );
    }
    // Get all the roles and join with departments and display the department name
    findAllRoles() {
        return this.connection.promise().query
            (
                "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
            );
    }
    // Get all the employees and join with the roles/departments (display roles, salaries, departments, managers)
    findAllEmployees() {
        return this.connection.promise().query
            (
                "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
            );
    }
    // Add a Deptarment
    createDepartment(department) {
        return this.connection.promise().query
            (
                "INSERT INTO department SET ?", department
            );
    }
    // Add a Role
    createRole(role) {
        return this.connection.promise().query
            (
                "INSERT INTO role SET ?", role
            );
    }
    // Add an Employee
    createEmployee(employee) {
        return this.connection.promise().query
            (
                "INSERT INTO employee SET ?", employee
            );
    }
    // Update an Employee's Role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query
            (
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [roleId, employeeId]
            );
    }



    // BONUS Section below: 

    // Update an Employee's Manager
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query
            (
                "UPDATE employee SET manager_id = ? WHERE id = ?",
                [managerId, employeeId]
            );
    }
    // View Employee's by Manager and join with departments & roles - show titles & departments
    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query
            (
                "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
                managerId
            );
    }
    // View Employee's by Department. Join with roles - show titles.
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query
            (
                "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
                departmentId
            );
    }
    // Delete a Department
    removeDepartment(departmentId) {
        return this.connection.promise().query
            (
                "DELETE FROM department WHERE id = ?",
                departmentId
            );
    }
    // Delete a Role
    removeRole(roleId) {
        return this.connection.promise().query
            (
                "DELETE FROM role WHERE id = ?",
                roleId
            );
    }
    // Delete an employee
    removeEmployee(employeeId) {
        return this.connection.promise().query
            (
                "DELETE FROM employee WHERE id = ?",
                employeeId
            );
    }
    // Get employees but not their id
    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query
            (
                "SELECT id, first_name, last_name FROM employee WHERE id != ?",
                employeeId
            );
    }
    // View a Total Utilized Budget of a Department. Add all the salaries of all the employee's in the Dept. 
    // Show the user the id, dept, and utilized budget total.
    // "GROUP BY" is used for grouping all the rows from id's and names and grouped together. 
    // "SUM" (role.salary) will add up all the salaries from the specific groups. 
    viewDepartmentBudgets() {
        return this.connection.promise().query
            (
                "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
            );
    }
}
// create the database managemnet class. Pass the object "connection" to the "new DB" and exports 
module.exports = new DB(connection);