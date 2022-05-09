const customerQueries = {
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

}

module.exports = customerQueries