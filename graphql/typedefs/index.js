const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query {
       
        "Lay thong tin khach hang"
        getKhachHang(MaKhachHang: String!): KhachHang!
        
        "lay mat khau nguoi dung"
        checkLogin(TenDangNhap: String!, MatKhau: String!): CheckLoginResponse!
        
    }

    type Mutation {
        createKhachHang(
            MaKhachHang: String!,
            TenKhachHang: String!,
            DiaChi: String!,
            CMND: String!,
            SDT: String! 
        ): createKhachHangResponse
    }

    type KhachHang {
        MaKhachHang: String!
        TenKhachHang: String!
        DiaChi: String!
        CMND: String!
        SDT: String!
    }

    type createKhachHangResponse{
        code: Int!
        success: Boolean!
        message: String!
        khachhang: KhachHang
    }

     "Quan ly nguoi dung"
    type ChucNang{
        MaChucNang: String!
        TenChucNang: String!
        TenManHinhDuocLoad: String!
    }

    type NhomNguoiDung{
        MaNhom: String!
        TenNhom: String!
    }

    type PhanQuyen {
        MaNhom: NhomNguoiDung!
        MaChucNang: [ChucNang!]!
    }

    type NguoiDung {
        TenDangNhap: String!
        MatKhau: String!
        MaNhom: PhanQuyen!
    }

    type CheckLoginResponse {
        code: Int!
        success: Boolean!
        message: String!
        MaNhom: PhanQuyen 
    }
`;

module.exports = typeDefs;
