var mysql = require("mysql");
require("dotenv").config();


var db = mysql.createConnection({
    host: "localhost",
    user: 'sqluser',
    password: 'password',
    database: "quanlysotietkiem",
    dateStrings: 'date'
});

module.exports = db;
