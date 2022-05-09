const customerMutations = {
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
}

module.exports = customerMutations