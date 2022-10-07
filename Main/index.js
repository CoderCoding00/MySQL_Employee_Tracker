const { prompt } = require("inquirer");
// Imports everything from the db file
const db = require("./db");
require("console.table");

init();

// Questions for the user
function init() {
    loadMainPrompts();
}
// Prompt user with questions
// view all departments, view all roles, view all employees, 
// add a department, add a role, add an employee, 
// update an employee role
function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },


                // BONUS: Update employee managers, View employees by manager, View employees by department
                // Delete departments, Delete roles, Delete employees
                {
                    name: "Update Employee Managers",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View Employees by Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "View Employees by Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "Delete Departments",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Delete Roles",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "Delete Employees",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "View Total Utilized Budget of a Department",
                    value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        // Calls the function based on the users input
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;


            // BONUS:
            case "UPDATE_EMPLOYEE_MANAGER":
                updateEmployeeManager();
                break;
            case "VIEW_EMPLOYEES_BY_MANAGER":
                viewEmployeesByManager();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmployeesByDepartment();
                break;
            case "REMOVE_DEPARTMENT":
                removeDepartment();
                break;
            case "REMOVE_ROLE":
                removeRole();
                break;
            case "REMOVE_EMPLOYEE":
                removeEmployee();
                break;
            case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
                viewUtilizedBudgetByDepartment();
                break;
            // Quit
            default:
                quit();
        }
    }
    )
}

// View all deparments
function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => loadMainPrompts());
}

// View all roles (let roles = rows)
function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => loadMainPrompts());
}

// View all employees (let employees = rows)
function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainPrompts());
}

// Add a department
function addDepartment() {
    prompt([
        {
            name: "name",
            message: "What is the name of the department you would like to add?"
        }
    ])
        .then(res => {
            let name = res;
            db.createDepartment(name)
                // insert the name based on user input (name.name) used to access the name property
                .then(() => console.log(`${name.name} has been added to the database.`))
                .then(() => loadMainPrompts())
        })
}

// Add a role (let departments = rows)
function addRole() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) =>
            ({
                name: name,
                value: id
            }));
            // Prompt user with message 
            prompt([
                {
                    name: "title",
                    message: "What is the name of the role you would like to add?"
                },
                {
                    name: "salary",
                    message: "What's the salary of this role?"
                },
                {
                    // List with choices for user to select from (department_id)
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.createRole(role)
                        // use role.title to insert user input into the output the user will see
                        .then(() => console.log(`The ${role.title} role has been added to the database.`))
                        .then(() => loadMainPrompts())
                })
        })
}

// Add an employee
function addEmployee() {
    prompt([
        {
            name: "first_name",
            message: "Pleae enter the employee's first name?"
        },
        {
            name: "last_name",
            message: "Pleae enter the employee's last name?"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            // Get all roles, return a list of choices (let roles = rows)
            db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    // const for role choices (id, title)
                    const roleChoices = roles.map(({ id, title }) =>
                    ({
                        name: title,
                        value: id
                    }));
                    // Prompt the user with message and list of choices to select from
                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "What is the role of the new employee?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;
                            // Get employees and turn into an array (let employees = rows)
                            db.findAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    // create const for manager choices (id, first and last name)
                                    const managerChoices = employees.map(({ id, first_name, last_name }) =>
                                    ({
                                        // get first and last name from user input (first_name, last_name) are used to access the first_name and last_name properties
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));
                                    // Unshift method being used
                                    managerChoices.unshift({ name: "None", value: null });
                                    // Passing into the array managerChoices 
                                    prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Please select the new employee's manager, or choose none.",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            // let employee = array of objects (manager_id, role_id, first_name, last_name)
                                            let employee =
                                            {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.createEmployee(employee);
                                        })
                                        // Insert the first and last name from user input (firstName, lastName) are used to access the those properties
                                        .then(() => console.log(
                                            `${firstName} ${lastName} has been added to the database.`
                                        ))
                                        .then(() => loadMainPrompts())
                                })
                        })
                })
        })
}

// Update an employee role (let employees = rows)
function updateEmployeeRole() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            // create a const for employee choices (is, first and last name)
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                // get first and last name from user input (first_name, last_name) are used to access the first_name and last_name properties
                name: `${first_name} ${last_name}`,
                value: id
            }));
            // Prompt user with message and a list of choices to select from
            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role would you like to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));
                            // Prompt user with message and list of roles to choose from
                            prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Choose a role to assign the employee.",
                                    choices: roleChoices
                                }
                            ])
                                // Let user know the employee role has been updated.
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("The employee's role has been updated."))
                                .then(() => loadMainPrompts())
                        });
                });
        })
}

// Update employee managers
function updateEmployeeManager() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            // create const for employee choices (id, first and last name)
            const employeeChoices = employees.map(({ id, first_name, last_name }) =>
            ({
                // input first and last name based on user
                name: `${first_name} ${last_name}`,
                value: id
            }));
            // Prompt user with message and choices from list
            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Select the employee's manager you would like to update.",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId
                    db.findAllPossibleManagers(employeeId)
                        .then(([rows]) => {
                            let managers = rows;
                            const managerChoices = managers.map(({ id, first_name, last_name }) =>
                            ({
                                // input first and last name based on user input (first_name, last_name) are used to access the first_name and last_name properties
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));
                            // Prompt user wit message and list to choose from
                            prompt([
                                {
                                    type: "list",
                                    name: "managerId",
                                    message:
                                        "Who would you like to select as the manager for this employee?",
                                    choices: managerChoices
                                }
                            ])
                                // let user know the employee's manager has been updated
                                .then(res => db.updateEmployeeManager(employeeId, res.managerId))
                                .then(() => console.log("The employee's manager has been updated."))
                                .then(() => loadMainPrompts())
                        })
                })
        })
}

// View employee's by manager
function viewEmployeesByManager() {
    db.findAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            // create const for manager choices (id, first and last name)
            const managerChoices = managers.map(({ id, first_name, last_name }) =>
            ({
                // input first and last name based on user input (first_name, last_name) are used to access the first_name and last_name properties
                name: `${first_name} ${last_name}`,
                value: id
            }));
            // Prompt user with message and list of choices 
            prompt([
                {
                    type: "list",
                    name: "managerId",
                    message: "Select a manager to see the employee's they manage.",
                    choices: managerChoices
                }
            ])
                .then(res => db.findAllEmployeesByManager(res.managerId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    // If the employee does not have a manager
                    if (employees.length === 0) {
                        console.log("This employee has no manager");
                    } else {
                        console.table(employees);
                    }
                })
                .then(() => loadMainPrompts())
        });
}

// View Employee's by department
function viewEmployeesByDepartment() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            // Create const for dept choices (id, name of dept)
            const departmentChoices = departments.map(({ id, name }) =>
            ({
                name: name,
                value: id
            }));
            // Prompt user with meaaage and list of choices
            prompt([
                {
                    type: "list",
                    name: "departmentId",
                    message: "Select the department to view the employee's of that deparment.",
                    choices: departmentChoices
                }
            ])
                .then(res => db.findAllEmployeesByDepartment(res.departmentId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    console.table(employees);
                })
                .then(() => loadMainPrompts())
        });
}

// Delete/Remove a department (let departments = rows)
function removeDepartment() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            // create a const for dept choices (id, name)
            const departmentChoices = departments.map(({ id, name }) =>
            ({
                name: name,
                value: id
            }));
            // Prompt user with message and list of choices
            prompt({
                type: "list",
                name: "departmentId",
                message:
                    "Which department would you like to delete?",
                choices: departmentChoices
            })
                // Let user know the deptartment has been deleted.
                .then(res => db.removeDepartment(res.departmentId))
                .then(() => console.log(`The department has been deleted from the database.`))
                .then(() => loadMainPrompts())
        })
}

// Delete/Remove a role
function removeRole() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) =>
            ({
                name: title,
                value: id
            }));
            // Prompt user with message and list of choices
            prompt([
                {
                    type: "list",
                    name: "roleId",
                    message: "Which role do you want to delete?",
                    choices: roleChoices
                }
            ])
                // Let user know the role was deleted
                .then(res => db.removeRole(res.roleId))
                .then(() => console.log("The role has been deleted from the database."))
                .then(() => loadMainPrompts())
        })
}

// Delete/Remove an employee
function removeEmployee() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) =>
            // insert the first and last name chosen by user
            ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            // Prompt the user with message and list of choices
            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee do you want to delete?",
                    choices: employeeChoices
                }
            ])
                // Let user know the emploee has been deleted
                .then(res => db.removeEmployee(res.employeeId))
                .then(() => console.log("The emploee has been deleted."))
                .then(() => loadMainPrompts())
        })
}

// View all departments and show their utilized department budget
function viewUtilizedBudgetByDepartment() {
    db.viewDepartmentBudgets()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => loadMainPrompts());
}

// Exit the application with "Goodbye!" shown to the user
function quit() {
    console.log("Goodbye!");
    process.exit();
}