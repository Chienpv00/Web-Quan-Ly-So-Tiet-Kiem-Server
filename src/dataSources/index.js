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

    getKhachHangByCmnd(CMND) {
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
            const sql = `select MaPhieuGoi from phieugoitien`;

            this.connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }

                if (result.length === 0) {
                    resolve('PGT1');
                } else {
                    const arr = result.map((value) => {
                        return parseInt(value.MaPhieuGoi.substr(3));
                    });
                    resolve('PGT' + (Math.max.apply(null, arr) + 1));
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
    getLoaiTietKiem(MaLoaiTietKiem) {
        return new Promise((resolve, reject) => {
            const sql = `select * from LoaiTietKiem where MaLoaiTietKiem = \'${MaLoaiTietKiem}\'`;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

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
            let sql;
            if (NgayDaoHanKeTiep === null) {
                sql = `insert into PhieuGoiTien values (\'${MaPhieuGoi}\', \'${MaKhachHang}\', \'${MaLoaiTietKiem}\', ${SoTienGoi}, \'${NgayGoi}\', ${NgayRut}, ${TienPhatSinh}, ${Sodu}, ${NgayDaoHanKeTiep}, ${LaiSuatApDung}, ${TrangThai})`;
            } else {
                sql = `insert into PhieuGoiTien values (\'${MaPhieuGoi}\', \'${MaKhachHang}\', \'${MaLoaiTietKiem}\', ${SoTienGoi}, \'${NgayGoi}\', ${NgayRut}, ${TienPhatSinh}, ${Sodu}, \'${NgayDaoHanKeTiep}\', ${LaiSuatApDung}, ${TrangThai})`;
            }

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

    createMaKhachHangNext() {
        // dau tien doc ma khach hang len, sau do tao ma moi rồi trả vè
        return new Promise((resolve, reject) => {
            const sql = `select MaKhachHang from khachhang`;

            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                if (result.length === 0) {
                    resolve('KH1');
                } else {
                    const arr = result.map((value) => {
                        return parseInt(value.MaKhachHang.substr(2));
                    });
                    resolve('KH' + (Math.max.apply(null, arr) + 1));
                }
            });
        });
    }

    getLoaitk() {
        return new Promise((resolve, reject) => {
            const sql = 'select * from LoaiTietKiem';
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    getPhieuGoiTienbyMaLTK(maLTK) {
        return new Promise((resolve, reject) => {
            const sql = `select * from PhieuGoiTien where MaLoaiTietKiem = \'${maLTK}\'`;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    getPhieuGoiTienbyStatus(status) {
        return new Promise((resolve, reject) => {
            const sql = `select * from PhieuGoiTien where TrangThai = ${status}`;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    filterPGT({ loaiTK, status, month, year }) {
        let sqlLoaiTK;
        let sqlStatus;
        let sqlDate;
        loaiTK === '-1'
            ? (sqlLoaiTK = "MaLoaiTietKiem Like '%'")
            : (sqlLoaiTK = `MaLoaiTietKiem = \'${loaiTK}\'`);
        status === '-1' ? (sqlStatus = '') : (sqlStatus = `and TrangThai = ${status}`);

        if (month === '-1' && year == '-1') {
            sqlDate = '';
        } else if (month === '-1' && year != '-1') {
            sqlDate = `and NgayGoi LIKE \'${year}%\'`;
        } else if ((month != '-1') & (year == '-1')) {
            if (parseInt(month) < 10) {
                month = '0' + month;
            }
            sqlDate = `and NgayGoi LIKE \'_____${month}%\'`;
        } else {
            if (parseInt(month) < 10) {
                month = '0' + month;
            }

            sqlDate = `and NgayGoi LIKE \'${year}-${month}%\'`;
        }

        return new Promise((resolve, reject) => {
            let sql = `select * from PhieuGoiTien where ${sqlLoaiTK} ${sqlStatus} ${sqlDate} `;
            console.log(sql);
            this.connection.query(sql, (err, results) => {
                err ? reject(err) : resolve(results);
            });
        });
    }

    getListPGTbyDateMaLTK(MaLoaiTietKiem, { day, month, year }) {
        return new Promise((resolve, reject) => {
            MaLoaiTietKiem = this.connection.escape(MaLoaiTietKiem);

            const sql = `select * From PhieuGoiTien where MaLoaiTietKiem = ${MaLoaiTietKiem} AND NgayGoi = \'${year}-${month}-${day}\'`;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    getReportCMonth(date) {
        return new Promise((resolve, reject) => {
            const sql = `select COUNT(*) as count from PhieuGoiTien where NgayRut=\'${date}\' `;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result[0]);
            });
        });
    }

    getReportOMonth(date) {
        return new Promise((resolve, reject) => {
            const sql = `select COUNT(*) as count from PhieuGoiTien where NgayGoi=\'${date}\' `;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result[0]);
            });
        });
    }

    addLoaiTietKiem({ ma, ten, kyHan, laiSuat, ngayApDung }) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO LoaiTietKiem values (${this.connection.escape(
                ma
            )}, ${this.connection.escape(ten)}, ${this.connection.escape(
                kyHan
            )}, ${this.connection.escape(laiSuat)}, \'${ngayApDung}\')`;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    deleteLoaiTietKiem(ma) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM LOAITIETKIEM WHERE MaLoaiTietKiem = ${this.connection.escape(
                ma
            )}`;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    getMaLoaiTietKiemNext() {
        // dau tien doc ma khach hang len, sau do tao ma moi rồi trả vè
        return new Promise((resolve, reject) => {
            const sql = `select MaLoaiTietKiem from LoaiTietKiem`;

            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                if (result.length === 0) {
                    resolve('LTK1');
                } else {
                    const arr = result.map((value) => {
                        return parseInt(value.MaLoaiTietKiem.substr(3));
                    });
                    resolve('LTK' + (Math.max.apply(null, arr) + 1));
                }
            });
        });
    }

    updateLoaiTietKiem({ ma, ten, kyHan, laiSuat, ngayApDung }) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE LOAITIETKIEM SET TenLoaiTietKiem = ${this.connection.escape(
                ten
            )}, KyHan = ${this.connection.escape(
                kyHan,
                false
            )}, LaiSuatHienTai = ${this.connection.escape(
                laiSuat,
                false
            )}, NgayApDung=${this.connection.escape(
                ngayApDung
            )} WHERE MaLoaiTietKiem = ${this.connection.escape(ma)}`;
            this.connection.query(sql, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    getLoaitkWithma(ma){
        return new Promise((resolve, reject) => { 
            const sql =`select * from LoaiTietKiem where MaLoaiTietKiem = ${this.connection.escape(ma)}`
            this.connection.query(sql, (err, result) => { 
                err? reject(err): resolve(result)
             })
         })
    }
}

module.exports = Database;
