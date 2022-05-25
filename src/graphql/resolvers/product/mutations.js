const calInterest = require('../../../middleware/tinhTienLai');
const date = require('date-and-time');
const productMutations = {
    createPhieuGuiTien: async (_, { MaLoaiTietKiem, SoTienGoi, MaKhachHang }, { dataSources }) => {
        try {
            // tinh ma phieu goi ke tiep
            const MaPhieuGoi = await dataSources.database.getMaPhieuGoiNext();
            const now = new Date(); // create date obj
            const ms = now.valueOf(); // get date = ms

            // tinh ngay goi hien tai tu new Date()
            const NgayGoi = date.format(now, 'YYYY-MM-DD');

            let NgayDaoHanKeTiep;
            const KyHan = await dataSources.database.getKyHan(MaLoaiTietKiem);
            if (MaLoaiTietKiem == 'LTK1') {
                // ngay dao han ke tiep se la null neu ky han la khong ky han
                NgayDaoHanKeTiep = null;
            } else {
                // tinh ngay dao han ke tiep
                const NgayDaoHanKeTiepms = ms + parseInt(KyHan.KyHan) * 30 * 24 * 60 * 60 * 1000;
                const NgayDaoHanKeTiepCons = new Date(NgayDaoHanKeTiepms);
                NgayDaoHanKeTiep = date.format(NgayDaoHanKeTiepCons, 'YYYY-MM-DD');
            }

            const LaiSuatApDung = KyHan.LaiSuatHienTai;

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
                    PhieuGoiTien: {
                        ...PhieuGoiTien,
                        MaKhachHang: MaKhachHang,
                        MaLoaiTietKiem: MaLoaiTietKiem,
                    },
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

            return callDB.affectedRows === 1
                ? {
                      code: 200,
                      success: true,
                      message: 'Lap prt thanh cong!',
                  }
                : {
                      code: 200,
                      success: false,
                      message: 'that bai',
                  };
        } catch (error) {
            console.log('err lap prt: ', error);
            return {
                code: 404,
                success: false,
                message: 'That bai',
            };
        }
    },

    addLoaiTietKiem: async (_, { loaiTKInp }, { dataSources }) => {
        try {
            // get ma loai tiet kiem next
            const ma = await dataSources.database.getMaLoaiTietKiemNext();

            const resFromServer = await dataSources.database.addLoaiTietKiem({ ma, ...loaiTKInp });
            

            const LoaiTietKiem = await dataSources.database.getLoaiTietKiem(ma);
            return {
                code: 200,
                success: resFromServer.affectedRows === 1,
                message: 'Create Success',
                LoaiTietKiem: resFromServer.affectedRows === 1 ? { ...LoaiTietKiem[0] } : null,
            };
        } catch (error) {
            console.log('🚀 ~ file: mutations.js ~ line 131 ~ addLoaiTietKiem: ~ error', error);
            return {
                code: 404,
                success: false,
                message: 'errors from server',
            };
        }
    },

    deleteLoaiTietKiem: async (_, { ma }, { dataSources }) => {
        try {
            const LoaiTietKiem = await dataSources.database.getLoaiTietKiem(ma);
            const resFromServer = await dataSources.database.deleteLoaiTietKiem(ma);

            return {
                code: 200,
                success: resFromServer.affectedRows === 1,
                message: 'Delete Success',
                LoaiTietKiem: resFromServer.affectedRows === 1 ? { ...LoaiTietKiem[0] } : null,
            };
        } catch (error) {
            console.log('🚀 ~ file: mutations.js ~ line 131 ~ addLoaiTietKiem: ~ error', error);
            return {
                code: 404,
                success: false,
                message: 'errors from server',
            };
        }
    },

    updateLoaiTietKiem: async (_, {loaiTKInp}, {dataSources}) => {
        try {

            const resFromServer = await dataSources.database.updateLoaiTietKiem(loaiTKInp);
            console.log(
                '🚀 ~ file: mutations.js ~ line 120 ~ addLoaiTietKiem: ~ resFromServer',
                resFromServer
            );

            const LoaiTietKiem = await dataSources.database.getLoaiTietKiem(loaiTKInp.ma);
            return {
                code: 200,
                success: resFromServer.affectedRows === 1,
                message: 'Update Success',
                LoaiTietKiem: resFromServer.affectedRows === 1 ? { ...LoaiTietKiem[0] } : null,
            };
        } catch (error) {
            console.log('🚀 ~ file: mutations.js ~ line 131 ~ addLoaiTietKiem: ~ error', error);
            return {
                code: 404,
                success: false,
                message: 'errors from server',
            };
        }
    }
};

module.exports = productMutations;
