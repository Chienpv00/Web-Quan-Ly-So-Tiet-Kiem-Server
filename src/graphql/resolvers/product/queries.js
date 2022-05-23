const tinhTienLai = require('../../../middleware/tinhTienLai');
const date = require('date-and-time');

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
        console.log('🚀 ~ file: queries.js ~ line 32 ~ getLoaitk: ~ loaitk', loaitk);
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

    getDSPGTbyStatus: async (_, { status }, { dataSources }) => {
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

    filterPGT: async (_, { input }, { dataSources }) => {
        const result = await dataSources.database.filterPGT(input);
        return result;
    },

    getReportDay: async (_, { date }, { dataSources }) => {
        const LoaiTietKiem = await dataSources.database.getLoaitk();

        // lay dc 1 mang chua mang cac phieu goi tien theo dieu kien loai tiet kiem nao
        const result = new Array(LoaiTietKiem.length).fill([]);

        // declare date at the time we rut tien
        // const d = '2022/10/11';
        const d = date.year + '-' + date.month + '-' + date.day;

        // create array tra ket qua
        const response = LoaiTietKiem.map((value) => {
            return {
                LoaiTietKiem: value.TenLoaiTietKiem,
                TongThu: 0,
                TongChi: 0,
            };
        });
        // const response = new Array(LoaiTietKiem.length).fill({
        //     LoaiTietKiem: LoaiTietKiem[],
        //     TongThu: 0,
        //     TongChi: 0,
        // });

        for (let i = 0; i < LoaiTietKiem.length; i++) {
            result[i] = await dataSources.database.getListPGTbyDateMaLTK(
                LoaiTietKiem[i].MaLoaiTietKiem,
                date
            );
        }

        for (let i = 0; i < result.length; i++) {
            // response[i].LoaiTietKiem = result[i][0].MaLoaiTietKiem;
            if (result[i].length === 0) {
                response[i].TongThu = 0;
                response[i].TongChi = 0;
            } else {
                for (const element of result[i]) {
                    element.SoDu = await tinhTienLai(
                        element.MaLoaiTietKiem,
                        element.SoTienGoi,
                        d,
                        element.NgayDaoHanKeTiep
                    );

                    if (element.TrangThai === 1) {
                        response[i].TongThu += parseInt(element.SoDu);
                    } else {
                        response[i].TongChi += parseInt(element.SoDu);
                    }
                }
            }
        }
        return response;
    },

    getReportOCMonth: async (_, { month, year }, { dataSources }) => {
        let response = [];
        // tim ngay cuoi cung cua thang
        const dateInp = new Date();
        dateInp.setFullYear(parseInt(year), parseInt(month));
        dateInp.setDate(0);
        const lastDayOfMonth = date.format(dateInp, 'DD'); // result

        for (let i = 1; i <= parseInt(lastDayOfMonth); i++) {
            // b1: merge date
            let day;
            i < 10 ? (day = '0' + i) : (day = i);
            let date = year + '-' + month + '-' + i;
            /////
            // b2: access dataSource then get count all PGT with condition: NgayRut
            let close = await dataSources.database.getReportCMonth(date);

            // b3: access db to get pgt open with condition: NgayGoi
            let open = await dataSources.database.getReportOMonth(date);

            // b4: update response use destructuring
            response = [...response, { day: date, open: open.count, close: close.count }];
        }
        return response
    },
};

module.exports = productQueries;
