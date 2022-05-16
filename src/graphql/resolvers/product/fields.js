const productFields = {
    PhieuGoiTien: {
        MaLoaiTietKiem: async ({MaLoaiTietKiem},_, {dataSources})=>{
            // return LoaiTietKiem
            const pgt = await dataSources.database.getLoaiTietKiem(MaLoaiTietKiem);
            return pgt[0]
        },
        MaKhachHang: async ({MaKhachHang}, _, {dataSources})=>{
            // return KhachHang
            const customer = await dataSources.database.getKhachHang(MaKhachHang)
            return customer[0]
        }
    }
}

module.exports = productFields