const userQueries = {
    checkLogin: async (_, { TenDangNhap, MatKhau }, { dataSources }) => {
        try {
            const user = await dataSources.database.getNguoiDung(TenDangNhap);
            console.log("🚀 ~ file: queries.js ~ line 5 ~ checkLogin: ~ user", user)
            // lay lieu trong bang NhomNguoiDung -> {MaNhom, Ten Nhom}
            const nhomNDObj = await dataSources.database.getNhomNguoiDung(user.MaNhom);
            console.log("🚀 ~ file: queries.js ~ line 8 ~ checkLogin: ~ nhomNDObj", nhomNDObj)
            const chucNangArr = await dataSources.database.getChucNangNguoiDung(user.MaNhom);
            console.log("🚀 ~ file: queries.js ~ line 10 ~ checkLogin: ~ chucNangArr", chucNangArr)
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
