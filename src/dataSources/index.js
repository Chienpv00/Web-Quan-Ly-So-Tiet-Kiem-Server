const db = require('../config/db');

class Database {
    connection = db;
    createKhachHang(MaKhachHang, TenKhachHang, DiaChi, CMND, SDT) {
        return new Promise((resolve, reject) => {
            //query insert khach hang moi vao db
            var sql = `insert into KHACHHANG values (\'${MaKhachHang}\', \'${TenKhachHang}\', \'${DiaChi}\', \'${CMND}\', \'${SDT}\')`;

            // query in database
            this.connection.query(sql, (err, result) => {
                if (err) reject(err); // throw err
                resolve('Chen khach hang moi thanh cong');
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
                resolve(result); // gui gia tri ra ngoai
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
                resolve(result[0]);
            });
        });
    }

    // get all field from table nhomnguoidung -> phan quyen
    getNhomNguoiDung(MaNhom) {
        // tham so dau vao la ma nhom nguoi dung
        return new Promise((resolve, reject) => {
            // query statement
            var sql = `select * from NhomNguoiDung where MaNhom = \'${MaNhom}\'`;

            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result[0]); // tra ve mot object duy nhat
            });
        });
    }

    // get all field from table Chucnang
    // input: MaNhom --- output: [{},{}]
    getChucNangNguoiDung(MaNhom) {
        return new Promise((resolve, reject) => {
            //sql statement
            const sql = `select * from chucnang where machucnang = (select machucnang from PHANQUYEN where MaNhom= \'${MaNhom}\')`;

            // return array
            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result); // return arr
            });
        });
    }

    checkKhachHangExists(CMND) {
        return new Promise((resolve, reject) => {
            // sql statment
            const sql = `select * from KhachHang where CMND=\'${CMND}\'`;

            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    getKhachHangByCmnd(CMND){
        return new Promise((resolve, reject) => {
            // sql statment
            const sql = `select * from KhachHang where CMND=\'${CMND}\'`;

            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // lay ma phieu goi tiep theo
    getMaPhieuGoiNext() {
        // sql statement

        return new Promise((resolve, reject) => {
            const sql = `select MaPhieuGoi from phieugoitien order by maphieugoi desc limit 1`;

            this.connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }

                if (result.length === 0) {
                    resolve('PGT1');
                } else {
                    // resolve(result)
                    // cat chuoi resutl tach chu vs so ra 2 phan
                    // parseInt phan sau, sau do + 1
                    // gep chuoi va resolve
                    let str = result[0].MaPhieuGoi.substr(0, 3);
                    let nbr = parseInt(result[0].MaPhieuGoi.substr(3));
                    nbr += 1;
                    resolve(str + nbr);
                }
            });
        });
    }

    // lay ky han tu bang Loaitietkiem
    getKyHan(MaLoaiTietKiem) {
        return new Promise((resolve, reject) => {
            const sql = `select * from loaitietkiem where maloaitietkiem = \'${MaLoaiTietKiem}\'`;
            this.connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0]);
            });
        });
    }

    // lay LoaiTietKiem

    // tao mot phieu gui tien moi
    createPhieuGoiTien(
        MaPhieuGoi,
        MaKhachHang,
        MaLoaiTietKiem,
        SoTienGoi,
        NgayGoi,
        NgayRut,
        TienPhatSinh,
        Sodu,
        NgayDaoHanKeTiep,
        LaiSuatApDung,
        TrangThai
    ) {
        return new Promise((resolve, reject) => {
            const sql = `insert into PhieuGoiTien values (\'${MaPhieuGoi}\', \'${MaKhachHang}\', \'${MaLoaiTietKiem}\', ${SoTienGoi}, \'${NgayGoi}\', ${NgayRut}, ${TienPhatSinh}, ${Sodu}, \'${NgayDaoHanKeTiep}\', ${LaiSuatApDung}, ${TrangThai})`;

            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // doc 1 phieu goi tien
    getPhieuGoiTien(MaPhieuGoi) {
        return new Promise((resolve, reject) => {
            const sql = `select * from PhieuGoiTien where MaPhieuGoi = \'${MaPhieuGoi}\'`;
            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                if (result.length === 0) resolve({});
                resolve(result[0]);
            });
        });
    }

    getPhieuGoiTienbyMaKH(MaKhachHang) {
        return new Promise((resolve, reject) => {
            const sql = `select * from PhieuGoiTien where MaKhachHang = \'${MaKhachHang}\' and TrangThai = 1`;
            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    createPhieuRutTien(MaPhieuGoi, NgayRut, TienLaiPhatSinh, SoDu) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE PhieuGoiTien SET NgayRut = \'${NgayRut}\', TienLaiPhatSinh = ${this.connection.escape(
                TienLaiPhatSinh
            )}, SoDu = ${this.connection.escape(
                SoDu
            )}, TrangThai=0  where MaPhieuGoi=${this.connection.escape(MaPhieuGoi)} `;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    createMaKhachHangNext(){
        // dau tien doc ma khach hang len, sau do tao ma moi rồi trả vè
        return new Promise((resolve, reject) => {
            const sql = `select MaKhachHang from khachhang`;

            this.connection.query(sql, (err, result) => {
                if (err) reject(err)
                if (result.length === 0 ){
                    resolve('KH1');
                } else {
                    const arr = result.map((value) => { return parseInt(value.MaKhachHang.substr(2)) })
                    resolve('KH' + (Math.max.apply(null, arr) + 1))
                }
            });
        });
    }
}

module.exports = Database;
