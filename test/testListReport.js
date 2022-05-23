const Database = require('../src/dataSources/index');
const tinhTienLai = require('../src/middleware/tinhTienLai');
const dataSources = { database: new Database() };

const test = async (date) => {
    const LoaiTietKiem = await dataSources.database.getLoaitk();
    let soduSauCung;

    // lay dc 1 mang chua mang cac phieu goi tien theo dieu kien loai tiet kiem nao
    const result = new Array(LoaiTietKiem.length).fill([]);

    // declare date at the time we rut tien
    const d = '2022/10/11';

    // create array tra ket qua
    const response = LoaiTietKiem.map((value) => {
        return {
            LoaiTietKiem: value.MaLoaiTietKiem,
            TongThu: 0,
            TongChi: 0,
        };
    });
    // const response = new Array(LoaiTietKiem.length).fill({
    //     LoaiTietKiem: LoaiTietKiem[],
    //     TongThu: 0,
    //     TongChi: 0,
    // });
    console.log('🚀 ~ file: queries.js ~ line 99 ~ response ~ response', response);

    for (let i = 0; i < LoaiTietKiem.length; i++) {
        result[i] = await dataSources.database.getListPGTbyDateMaLTK(
            LoaiTietKiem[i].MaLoaiTietKiem,
            date
        );
    }

    console.log(result[0][0].MaLoaiTietKiem);
    for (let i = 0; i < result.length; i++) {
        response[i].LoaiTietKiem = result[i][0].MaLoaiTietKiem;
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

                console.log('element.sodu: ', typeof element.SoDu);
                if (element.TrangThai === 1) {
                    response[i].TongThu += parseInt(element.SoDu);
                } else {
                    response[i].TongChi += parseInt(element.SoDu);
                }
            }
        }
        console.log(i, response);
    }
    console.log("🚀 ~ file: testListReport.js ~ line 64 ~ test ~ response", response)
    return response;
};

console.log(test({ day: '16', month: '05', year: '2022' }));
