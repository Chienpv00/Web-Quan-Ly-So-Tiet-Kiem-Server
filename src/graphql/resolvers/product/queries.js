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

    getLoaitk: async (_, __, { dataSources }) => {
        const loaitk = await dataSources.database.getLoaitk();
        console.log("🚀 ~ file: queries.js ~ line 32 ~ getLoaitk: ~ loaitk", loaitk)
        return loaitk;
    },

    getDSPGTbyLTK: async (_, { maLTK }, { dataSources }) => {
        try {
            const pgtArr = await dataSources.database.getPhieuGoiTienbyMaLTK(maLTK);
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

    getDSPGTbyStatus: async (_, {status}, {dataSources}) => { 
        try {
            const pgtArr = await dataSources.database.getPhieuGoiTienbyStatus(status);
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

     filterPGT: async (_,{input}, {dataSources}) => {
         const result  = await dataSources.database.filterPGT(input)
         return result
     }
};

module.exports = productQueries;
