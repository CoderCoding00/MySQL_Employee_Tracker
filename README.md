# Challenge 12 MYSQL - Employee Tracker

## Assignment Overview

The assignment was to build a command-line application from scratch that could manage a company's employee database. We were asked to use Node.js, Inquirer, and MySQL.

The application was not deployed. We were asked to create a video demostrating the functionality of the application. I will provide a link to the video in the README.

## Overview of Requirements 

We were asked to create 3 tables with the following categories and what they hold:

* `department`

    * `id`: `INT PRIMARY KEY`

    * `name`: `VARCHAR(30)` to hold department name

* `role`

    * `id`: `INT PRIMARY KEY`

    * `title`: `VARCHAR(30)` to hold role title

    * `salary`: `DECIMAL` to hold role salary

    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`

    * `id`: `INT PRIMARY KEY`

    * `first_name`: `VARCHAR(30)` to hold employee first name

    * `last_name`: `VARCHAR(30)` to hold employee last name

    * `role_id`: `INT` to hold reference to employee role

    * `manager_id`: `INT` to hold reference to another employee who manage's the current employee (`null` if the employee has no manager)

## The Bonus Section for this assignment was to do the following:

* Update employee managers.

* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees.

* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.


## Link To Video 
[link to video] (https://watch.screencastify.com/v/ZTneCtWHWVFIJ9NuVPGO)


