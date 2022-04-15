create database QUANLYSOTIETKIEM;
use QUANLYSOTIETKIEM;

create table KHACHHANG (
	MaKhachHang varchar(10),
    TenKhachHang nvarchar(100) not null,
    DiaChi nvarchar(200) not null,
    CMND varchar(12) not null unique,
    SDT char(10) not null, 
    primary key (MaKhachHang)
);

create table LOAITIETKIEM (
	MaLoaiTietKiem varchar(10),
    TenLoaiTietKiem nvarchar(100) not null,
    KyHan int not null,
    LaiSuatHienTai float not null,
    NgayApDung date not null,
    primary key(MaLoaiTietKiem)
);

-- insert into khachhang values ('KH001', 'Phạm Viết Chiến', 'Ký túc xá khu B, Tp. Dĩ An, Bình Dương', '241849223', '0385508780');

select * from khachhang;