const Database = require('../dataSources/index');
const tinhChenhLechNgay = require('./tinhChenhLechNgay');

const db = new Database();
// const db = require('../config/db')

const calInterest = async (LoaiTietKiem, SoTienGoi, NgayGoi, NgayDaoHanKeTiep) => {
    let sodu;
    const ngayChenhLech = tinhChenhLechNgay(NgayGoi);
    const loaiTKArr = await db.getLoaiTietKiem(LoaiTietKiem);
    // const loaiTKArr = [
    //     {
    //         MaLoaiTietKiem: 'LTK1',
    //         TenLoaiTietKiem: 'Không kỳ hạn',
    //         KyHan: 1,
    //         LaiSuatHienTai: 0.015,
    //         NgayApDung: '2022-01-05',
    //     },
    // ];
    const loaiTK = loaiTKArr[0];

    const LaiSuatApDung = loaiTK.LaiSuatHienTai;
    const KyHan = loaiTK.KyHan;

    if (NgayDaoHanKeTiep === null || ngayChenhLech < KyHan * 30) {
        sodu = SoTienGoi + ((SoTienGoi * LaiSuatApDung) / 365) * ngayChenhLech;
    } else if (ngayChenhLech === KyHan * 30) {
        sodu = SoTienGoi + ((SoTienGoi * LaiSuatApDung) / 365) * ngayChenhLech;
    } else {
        let length = ngayChenhLech;
        const size = parseInt(ngayChenhLech / (KyHan * 30)); // so lan cua ky han ma kh k den lay
        sodu = SoTienGoi;
        for (let i = 0; i < size; i++) {
            // so du moi tren moi vong lap - vong lap bieu thi cho ky han, vi du nhu ltk2 la 90 ngay
            // so du moi se bang so du cu cong voi tien lai
            // tien lai duoc tinh theo so du cua ky han truoc do
            sodu = sodu + ((sodu * LaiSuatApDung) / 365) * (KyHan * 30);
        }

        // tinh ngay bi du ra de tinh so tien lai voi lai suat la khong ky han
        const outDay = ngayChenhLech % (KyHan * 30);

        // Lay lai suat khong ky han tu db
        const laiSuatKhongKyHan = await new Promise((resolve, reject) => {
            const sql1 = `select LaiSuatHienTai from LoaiTietKiem where maloaitietkiem = 'LTK1'`;
            db.query(sql1, (err, result) => {
                if (err) reject(err);
                resolve(result[0].LaiSuatHienTai);
            });
        });

        // so du cuoi
        sodu += ((sodu * laiSuatKhongKyHan) / 365) * outDay;
    }
    return sodu.toFixed(0);
};

// const tinhTienLai = (LoaiTietKiem, SoTienGoi, NgayGoi, NgayDaoHanKeTiep) => {
// calInterest(LoaiTietKiem, SoTienGoi, NgayGoi, NgayDaoHanKeTiep).then((value) => { console.log(value); })
// }

// s = calInterest('LTK1', 20000000, "2022-05-16", null)
// console.log(s);
// console.log("🚀 ~ file: tinhTienLai.js ~ line 68 ~ s", s)
// module.exports = tinhTienLai;
module.exports = calInterest