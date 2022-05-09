const resolvers = {
    Query: {
        getKhachHang: async (_, { MaKhachHang }, { dataSources }) => {
            try {
                const KhachHang = await dataSources.database.getKhachHang(MaKhachHang);
                return {
                    ...KhachHang,
                };
            } catch (err) {
                console.log(err);
            }
        },

        checkLogin: async (_, { TenDangNhap, MatKhau }, { dataSources }) => {
            try {
                const user = await dataSources.database.getNguoiDung(TenDangNhap);
                // lay lieu trong bang NhomNguoiDung -> {MaNhom, Ten Nhom}
                const nhomNDObj = await dataSources.database.getNhomNguoiDung(user.MaNhom);
                const chucNangArr = await dataSources.database.getChucNangNguoiDung(user.MaNhom)
                if (user) {
                    if (MatKhau === user.MatKhau) {
                        return {
                            code: 200,
                            success: true,
                            message: 'Dang nhap thanh cong',
                            TenDangNhap: TenDangNhap,
                            MaNhom: user.MaNhom,
                            PhanQuyen: {
                                MaNhom: nhomNDObj,
                                MaChucNang: chucNangArr
                            }
                        };
                    } else {
                        return {
                            code: 200,
                            success: false,
                            message: 'Dang nhap that bai',
                            TenDangNhap: TenDangNhap
                        };
                    }
                } else {
                    return {
                        code: 200,
                        success: false,
                        message: 'Dang nhap that bai',
                        TenDangNhap: TenDangNhap
                    };
                }
            } catch (error) {
                return {
                    code: 404,
                    success: false,
                    message: error.toString(),
                    TenDangNhap: TenDangNhap
                };
            }
        },      

        checkKhachHangExists: async (_, { CMND }, { dataSources }) => {
            try {
                const isCMND = await dataSources.database.checkKhachHangExists(CMND);
                if (isCMND.length == 1) {
                    return {
                        code: 200,
                        success: true,
                        exists: true,
                        KhachHang: isCMND[0]
                    };
                } else {
                    return {
                        code: 200,
                        success: true,
                        exists: false,
                    };
                }
            } catch (err) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    exists: false,
                };
            }
        },

        getPhieuGoiTien: async (_, {MaPhieuGoi}, {dataSources}) => { 
            try {
                
            } catch (error) {
                
            }
         }
        
    },
   
    

    Mutation: {
        createKhachHang: async (
            _,
            { MaKhachHang, TenKhachHang, DiaChi, CMND, SDT },
            { dataSources }
        ) => {
            try {
                const res = await dataSources.database.createKhachHang(
                    MaKhachHang,
                    TenKhachHang,
                    DiaChi,
                    CMND,
                    SDT
                );

                return {
                    code: 200,
                    success: true,
                    message: res,
                    khachhang: {
                        MaKhachHang: MaKhachHang,
                        TenKhachHang: TenKhachHang,
                        DiaChi: DiaChi,
                        CMND: CMND,
                        SDT: SDT,
                    },
                };
            } catch (err) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                };
            }
        },
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
    },
};

module.exports = resolvers;
