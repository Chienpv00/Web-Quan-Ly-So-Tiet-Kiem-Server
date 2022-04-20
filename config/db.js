var mysql = require("mysql");
require("dotenv").config();


var db = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "quanlysotietkiem",
    dateStrings: 'date'
});

module.exports = db;
