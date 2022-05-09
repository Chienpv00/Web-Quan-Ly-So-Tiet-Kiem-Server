const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        "Lay thong tin khach hang"
        getKhachHang(MaKhachHang: String!): KhachHang!

        "lay mat khau nguoi dung"
        checkLogin(TenDangNhap: String!, MatKhau: String!): CheckLoginResponse!

        "Kiem tra khach hang da co thong tin trong db chua"
        checkKhachHangExists(CMND: String!): checkKhachHangExistsResponse!

        "Lay phieu goi tien"
        getPhieuGoiTien(MaPhieuGoi: String!): PhieuGoiTien!
    }

    type Mutation {
        createKhachHang(
            MaKhachHang: String!
            TenKhachHang: String!
            DiaChi: String!
            CMND: String!
            SDT: String!
        ): createKhachHangResponse
        createPhieuGuiTien(MaLoaiTietKiem: String!, SoTienGoi: Float!, MaKhachHang: String!): createPhieuGuiTienResponse!
    }

    type KhachHang {
        MaKhachHang: String!
        TenKhachHang: String!
        DiaChi: String!
        CMND: String!
        SDT: String!
    }

    "Quan ly nguoi dung"
    type ChucNang {
        MaChucNang: String!
        TenChucNang: String!
        TenManHinhDuocLoad: String!
    }

    type NhomNguoiDung {
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
        MaNhom: String!
    }

    type LoaiTietKiem {
        "Mã loại tiết kiệm"
        MaLoaiTietKiem: String!
        "Tên loại tiết kiệm"
        TenLoaiTietKiem: String!
        """
        Kỳ hạn: là số tháng của một kỳ hạn (để tính ngày đáo hạn kế tiếp)
        –	Không kỳ hạn: 1 tháng
        –	Loại 3 tháng: 3 tháng
        –	Loại 6 tháng: 6 tháng
        """
        KyHan: Int!
        """
        Lãi suất của loại tiết kiệm
        –	Không kỳ hạn: 0.15
        –	Loại 3 tháng: 0.5
        –	Loại 6 tháng: 0.55
        """
        LaiSuatHienTai: Float!
        "Ngày áp dụng loại tiết kiệm"
        NgayApDung: String!
    }

    type PhieuGoiTien {
        "Mã phiếu gởi tiền tiết kiệm"
        MaPhieuGoi: String!
        "Tham chiếu tới bảng KHACHHANG (MaKhachHang)"
        MaKhachHang: KhachHang!
        "Tham chiếu tới bảng LOAITIETKIEM (MaLoaiTK)"
        MaLoaiTietKiem: LoaiTietKiem!
        "Số tiền gởi tiết kiệm"
        SoTienGoi: Float!
        "Ngày lập phiếu gởi tiền"
        NgayGoi: String!
        "Ngày rút tiền (ngày đóng phiếu)"
        NgayRut: String
        "Tiền lãi phát sinh (tổng số tiền lãi tích lũy được khi khách hàng không đến nhận)"
        TienLaiPhatSinh: Float!
        "Số dư hiện có (số tiền gửi + tiền lãi phát sinh)"
        SoDu: Float!
        "Ngày đáo hạn kế tiếp"
        NgayDaoHanKeTiep: String
        "Lãi suất áp dụng"
        LaiSuatApDung: Float!
        "Trạng thái đóng/mở của phiếu (1 là mở, 0 là đóng)"
        TrangThai: Boolean!
    }

    "Lap Phieu goi tien"
    type createKhachHangResponse {
        code: Int!
        success: Boolean!
        message: String!
        khachhang: KhachHang
    }

    type CheckLoginResponse {
        code: Int!
        success: Boolean!
        message: String!
        TenDangNhap: String!
        MaNhom: String
        PhanQuyen: PhanQuyen
    }

    "Khach hang"
    type checkKhachHangExistsResponse {
        code: Int!
        success: Boolean!
        exists: Boolean!
        KhachHang: KhachHang
    }

    "Phieu gui tien res"
    type createPhieuGuiTienResponse {
        code: Int!
        success: Boolean!
        message: String!
        PhieuGoiTien: PhieuGoiTien
    }
`;

module.exports = typeDefs;
