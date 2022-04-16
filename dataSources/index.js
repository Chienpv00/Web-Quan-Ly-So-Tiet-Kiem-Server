const db = require("../config/db");

class Database {
    connection = db;
    createKhachHang(MaKhachHang, TenKhachHang, DiaChi, CMND, SDT) {
        return new Promise((resolve, reject) => {
            //query insert khach hang moi vao db
            var sql = `insert into KHACHHANG values (\'${MaKhachHang}\', \'${TenKhachHang}\', \'${DiaChi}\', \'${CMND}\', \'${SDT}\')`;

            // query in database
            this.connection.query(sql, (err, result) => {
                if (err) reject(err); // throw err
                console.log(result);
                resolve("Chen khach hang moi thanh cong");
            });
        });
    }

    async getKhachHang(MaKhachHang) {
        return new Promise((resolve, reject) => {
            // query statement in mysql
            var sql = `select * from khachhang where makhachhang = \'${MaKhachHang}\'`;

            // query syntax
            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result[0]); // gui gia tri ra ngoai
            });
        });
    }

    getNguoiDung(TenDangNhap) {
        return new Promise((resolve, reject) => {
            // query statement
            var sql = `select * from nguoidung where tendangnhap=\'${TenDangNhap}\'`;

            // query db
            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                // console.log(result[0]);
                resolve(result[0]);
            });
        });
    }

    // get all field from table nhomnguoidung -> phan quyen
    getNhomNguoiDung(MaNhom){ // tham so dau vao la ma nhom nguoi dung
        return new Promise((resolve, reject) => {
            // query statement
            var sql = `select * from NhomNguoiDung where MaNhom = \'${MaNhom}\'`

            this.connection.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result[0]); // tra ve mot object duy nhat
            })
        })
    }

    // get all field from table Chucnang
    // input: MaNhom --- output: [{},{}]
    getChucNangNguoiDung(MaNhom){
        return new Promise((resolve, reject) => { 
            //sql statement
            const sql = `select * from chucnang where machucnang = (select machucnang from PHANQUYEN where MaNhom= \'${MaNhom}\')`

            // return array
            this.connection.query(sql, (err, result) => { 
                if (err)
                    reject(err)
                resolve (result) // return arr
             })
         })
    }
}

module.exports = Database;
