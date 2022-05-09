const userQueries = {
    checkLogin: async (_, { TenDangNhap, MatKhau }, { dataSources }) => {
        try {
            const user = await dataSources.database.getNguoiDung(TenDangNhap);
            // lay lieu trong bang NhomNguoiDung -> {MaNhom, Ten Nhom}
            const nhomNDObj = await dataSources.database.getNhomNguoiDung(user.MaNhom);
            const chucNangArr = await dataSources.database.getChucNangNguoiDung(user.MaNhom);
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
                            MaChucNang: chucNangArr,
                        },
                    };
                } else {
                    return {
                        code: 200,
                        success: false,
                        message: 'Dang nhap that bai',
                        TenDangNhap: TenDangNhap,
                    };
                }
            } else {
                return {
                    code: 200,
                    success: false,
                    message: 'Dang nhap that bai',
                    TenDangNhap: TenDangNhap,
                };
            }
        } catch (error) {
            return {
                code: 404,
                success: false,
                message: error.toString(),
                TenDangNhap: TenDangNhap,
            };
        }
    },
};

module.exports = userQueries;
