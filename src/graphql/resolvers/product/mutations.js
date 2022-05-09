const productMutations = {
    createPhieuGuiTien: async (
        _,
        { MaLoaiTietKiem, SoTienGoi, MaKhachHang },
        { dataSources }
    ) => {
        try {
            // tinh ma phieu goi ke tiep
            const MaPhieuGoi = await dataSources.database.getMaPhieuGoiNext();
            console.log(MaPhieuGoi);
            const now = new Date();
            const ms = now.valueOf();
            // tinh ngay goi hien tai tu new Date()
            const NgayGoi = now
                .getFullYear()
                .toString()
                .concat('/', (now.getMonth() + 1).toString(), '/', now.getDate().toString());
            console.log(typeof NgayGoi);
            let NgayDaoHanKeTiep;
            const KyHan = await dataSources.database.getKyHan(MaLoaiTietKiem);
            if (MaLoaiTietKiem == 'LTK1') {
                 NgayDaoHanKeTiep = null
            } else {
                const NgayDaoHanKeTiepms = ms + parseInt(KyHan.KyHan) * 30 * 24 * 60 * 60 * 1000;
                const NgayDaoHanKeTiepCons = new Date(NgayDaoHanKeTiepms);

                // tinh ngay dao han ke tiep
                NgayDaoHanKeTiep = NgayDaoHanKeTiepCons.getFullYear()
                    .toString()
                    .concat('/', (NgayDaoHanKeTiepCons.getMonth() + 1).toString(), '/', NgayDaoHanKeTiepCons.getDate().toString());

            }
           
            console.log(MaPhieuGoi);
            console.log(NgayGoi);
            console.log(NgayDaoHanKeTiep);


            
            const LaiSuatApDung = KyHan.LaiSuatHienTai;
            console.log(LaiSuatApDung)

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

            const PhieuGoiTien =await dataSources.database.getPhieuGoiTien(MaPhieuGoi)

            if (result) {
                return {
                    code: 200,
                    success: true,
                    message: 'Lap Phieu Gui tien Thanh cong',
                    PhieuGoiTien: PhieuGoiTien
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
}

module.exports = productMutations