const customerQueries = {
    getKhachHang: async (_, { MaKhachHang }, { dataSources }) => {
        try {
            const KhachHang = await dataSources.database.getKhachHang(MaKhachHang);
            if (KhachHang.length === 0)
                return null
                else
            return {
                ...KhachHang[0],
            };
        } catch (err) {
            console.log(err);
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

    getKhachHangByCmnd: async (_, {CMND}, {dataSources})=>{
        try {
            const KhachHang = await dataSources.database.getKhachHangByCmnd(CMND);
            if (KhachHang.length === 0)
                return null
                else
            return {
                ...KhachHang[0],
            };
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = customerQueries