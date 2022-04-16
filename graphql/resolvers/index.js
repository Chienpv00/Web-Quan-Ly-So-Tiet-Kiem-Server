const resolvers = {
    Query: {
        getKhachHang: async (_, { MaKhachHang }, { dataSources }) => {
            try {
                const KhachHang = await dataSources.database.getKhachHang(
                    MaKhachHang
                );
                return {
                    ...KhachHang,
                };
            } catch (err) {
                console.log(err);
            }
        },

        checkLogin: async (_, { TenDangNhap, MatKhau }, { dataSources }) => {
            try {
                const user = await dataSources.database.getNguoiDung(TenDangNhap)
                if (user){
                    const nhom = await dataSources.database.getNhomNguoiDung(user.MaNhom);
                    const chucNang = await dataSources.database.getChucNangNguoiDung(user.MaNhom);
                    if (MatKhau === user.MatKhau) {
                        return {
                            code: 200,
                            success: true,
                            message: 'Dang nhap thanh cong',
                            MaNhom: {
                                MaNhom: nhom,
                                MaChucNang: chucNang
                            }
                        }
                    } else {
                        return {
                            code: 200,
                            success: false,
                            message: 'Dang nhap that bai'
                        }
                    }
                } else {
                    return {
                        code: 200,
                        success: false,
                        message: 'Dang nhap that bai'
                    }
                }
            } catch (error) {
               return {
                   code: error.extensions.response.status,
                   success: false,
                   message: error.extensions.response.body
               }
            }
        },
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
    },
};

module.exports = resolvers;
