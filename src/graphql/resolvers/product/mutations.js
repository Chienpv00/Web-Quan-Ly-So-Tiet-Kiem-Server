const calInterest = require('../../../middleware/tinhTienLai');

const productMutations = {
    createPhieuGuiTien: async (_, { MaLoaiTietKiem, SoTienGoi, MaKhachHang }, { dataSources }) => {
        try {
            // tinh ma phieu goi ke tiep
            const MaPhieuGoi = await dataSources.database.getMaPhieuGoiNext();
            console.log(MaPhieuGoi);

            const now = new Date(); // create date obj
            const ms = now.valueOf(); // get date = ms

            // tinh ngay goi hien tai tu new Date()
            const NgayGoi = now
                .getFullYear()
                .toString()
                .concat('/', (now.getMonth() + 1).toString(), '/', now.getDate().toString());
            console.log(NgayGoi);

            let NgayDaoHanKeTiep;
            const KyHan = await dataSources.database.getKyHan(MaLoaiTietKiem);
            if (MaLoaiTietKiem == 'LTK1') {
                // ngay dao han ke tiep se la null neu ky han la khong ky han
                NgayDaoHanKeTiep = null;
            } else {
                // tinh ngay dao han ke tiep
                const NgayDaoHanKeTiepms = ms + parseInt(KyHan.KyHan) * 30 * 24 * 60 * 60 * 1000;
                const NgayDaoHanKeTiepCons = new Date(NgayDaoHanKeTiepms);
                NgayDaoHanKeTiep = NgayDaoHanKeTiepCons.getFullYear()
                    .toString()
                    .concat(
                        '/',
                        (NgayDaoHanKeTiepCons.getMonth() + 1).toString(),
                        '/',
                        NgayDaoHanKeTiepCons.getDate().toString()
                    );
            }

            console.log(NgayDaoHanKeTiep);

            const LaiSuatApDung = KyHan.LaiSuatHienTai;
            console.log(LaiSuatApDung);

            // mysql insert into
            const result = await dataSources.database.createPhieuGoiTien(
                MaPhieuGoi,
                MaKhachHang,
                MaLoaiTietKiem,
                SoTienGoi,
                NgayGoi,
                null,
                0,
                0,
                NgayDaoHanKeTiep,
                LaiSuatApDung,
                true
            );

            const PhieuGoiTien = await dataSources.database.getPhieuGoiTien(MaPhieuGoi);

            if (result) {
                return {
                    code: 200,
                    success: true,
                    message: 'Lap Phieu Gui tien Thanh cong',
                    PhieuGoiTien: PhieuGoiTien,
                };
            } else {
                return {
                    code: 200,
                    success: false,
                    message: 'Lap Phieu Goi Tien That bai',
                };
            }
        } catch (err) {
            return {
                code: 404,
                success: false,
                message: 'Something Wrong!',
            };
        }
    },

    createPhieuRutTien: async (_, { MaPhieuGoi, NgayRut }, { dataSources }) => {
        try {
            // get phieu goi tien voi ma phieu goi
            const pgt = await dataSources.database.getPhieuGoiTien(MaPhieuGoi);
            console.log('pgt: ', pgt);
            const SoDu = await calInterest(
                pgt.MaLoaiTietKiem,
                pgt.SoTienGoi,
                pgt.NgayGoi,
                pgt?.NgayDaoHanKeTiep
            );
            console.log('sodu: ', SoDu);
            const TienLaiPhatSinh = SoDu - pgt.SoTienGoi;

            const callDB = await dataSources.database.createPhieuRutTien(
                MaPhieuGoi,
                NgayRut,
                TienLaiPhatSinh,
                SoDu
            );

            return callDB.affectedRows===1 ? {
                code: 200,
                success: true,
                message: "Lap prt thanh cong!"
            } : {
                code: 200,
                success: false,
                message: "that bai"
            }
        } catch (error) {
            console.log('err lap prt: ', error);
            return {
                code: 404,
                success: false,
                message: "That bai"
            }
        }
    },
};

module.exports = productMutations;
