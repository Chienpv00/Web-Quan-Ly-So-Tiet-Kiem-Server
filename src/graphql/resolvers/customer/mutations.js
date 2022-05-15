const customerMutations = {
    createKhachHang: async (
        _,
        { TenKhachHang, DiaChi, CMND, SDT },
        { dataSources }
    ) => {
        try {
            const checkId = await dataSources.database.checkKhachHangExists(CMND)
            console.log("🚀 ~ file: mutations.js ~ line 9 ~ checkId", checkId)
            
            if(checkId.length !== 0){
                return {
                    code: 200,
                    message: "Trung cmnd",
                    success: false,
                }
            }
            const MaKhachHang = await dataSources.database.createMaKhachHangNext();
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
                code: 404,
                success: false,
                message: err,
            };
        }
    },
}

module.exports = customerMutations