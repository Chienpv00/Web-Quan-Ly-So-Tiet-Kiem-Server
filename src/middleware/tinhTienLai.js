const db = require('../config/db');
const tinhChenhLechNgay = require('./tinhChenhLechNgay');

const calInterest = async (LoaiTietKiem, SoTienGoi, NgayGoi, NgayDaoHanKeTiep) => {
    const ngayChenhLech = tinhChenhLechNgay(NgayGoi);
    console.log(ngayChenhLech);
    const loaiTK = await new Promise((resolve, reject) => {
        const sql = `select * from LoaiTietKiem where MaLoaiTietKiem = \'${LoaiTietKiem}\'`;
        db.query(sql, (err, result) => {
            err ? reject(err) : resolve(result[0]);
        });
    });
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
            console.log('sodu truoc: ', sodu);
            sodu = sodu + ((sodu * LaiSuatApDung)/365)*(KyHan*30);
            console.log('sodu sau: ', sodu);

        }

        // tinh ngay bi du ra de tinh so tien lai voi lai suat la khong ky han
        const outDay = ngayChenhLech % (KyHan * 30);
        console.log('outday: ', outDay);

        // Lay lai suat khong ky han tu db
        const laiSuatKhongKyHan = await new Promise((resolve, reject) => {
            const sql1 = `select LaiSuatHienTai from LoaiTietKiem where maloaitietkiem = 'LTK1'`;
            db.query(sql1, (err, result) => {
                if (err) reject(err);
                console.log(result);
                resolve(result[0].LaiSuatHienTai);
            });
        });
        console.log(laiSuatKhongKyHan);

        // so du cuoi
        sodu += ((sodu * laiSuatKhongKyHan) / 365) * outDay;
    }

    console.log('sodu:', parseInt(sodu));
    return sodu.toFixed(0);
};

module.exports = calInterest;
