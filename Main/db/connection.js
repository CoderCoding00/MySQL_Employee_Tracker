const mysql = require("mysql2");

// Create connetion object for mysql database 
const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password (mine is the default one given by mysql)
    password: "",
    // Name of the databse that already exists 
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;