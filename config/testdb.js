const db = require("./db");

const Database = require('../dataSources/index')

const database = new Database();

database.getKhachHang('KH001')


// db.connect((err) => {
//     if (err) throw err;
//     console.log("connected!");
//     var sql = `select * from khachhang`;
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// });

// db.end()



// db.connect((err) => {
//     if (err) throw err;
//     console.log("connected!");
//     var sql = `select * from khachhang`;
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// });
