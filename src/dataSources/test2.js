const db = require('../config/db');

const sql = `select MaPhieuGoi from phieugoitien`;

const tinhTienLai = require('../middleware/tinhTienLai')

// db.query(sql, (err, result) => {
//     if (err) {
//         console.log(err);
//     }

//     if (result.length !== 0) {
//         const arr = result.map((value) => { return parseInt(value.MaKhachHang.substr(2)) })
//         console.log("🚀 ~ file: test.js ~ line 12 ~ db.query ~ arr", Math.max.apply(null,arr) )
//         console.log('KH' +Math.max.apply(null,arr));
//     } else {
//     }
// });

console.log(tinhTienLai("LTK1", 2000000, "2022/05/16", null))
