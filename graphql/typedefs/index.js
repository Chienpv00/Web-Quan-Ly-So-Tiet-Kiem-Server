const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        getKhachHang(MaKhachHang: String!): KhachHang!
        
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
`;

module.exports = typeDefs;
