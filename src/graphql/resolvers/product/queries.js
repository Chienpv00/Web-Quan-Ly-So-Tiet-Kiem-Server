const tinhTienLai = require('../../../middleware/tinhTienLai');

const productQueries = {
    getPhieuGoiTien: async (_, { MaPhieuGoi }, { dataSources }) => {
        try {
        } catch (error) {}
    },

    getDSPGTbyMaKH: async (_, { MaKhachHang }, { dataSources }) => {
        try {
            const pgtArr = await dataSources.database.getPhieuGoiTienbyMaKH(MaKhachHang);
            if (pgtArr.length === 0) {
                return pgtArr;
            } else {
                pgtArr.forEach((element) => {
                    element.SoDu = tinhTienLai(
                        element.MaLoaiTietKiem,
                        element.SoTienGoi,
                        element.NgayGoi,
                        element.NgayDaoHanKeTiep
                    );
                });
                return pgtArr;
            }
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = productQueries;
