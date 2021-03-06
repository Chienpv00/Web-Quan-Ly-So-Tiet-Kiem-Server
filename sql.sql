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

create table PHIEUGOITIEN (
	MaPhieuGoi varchar(10),
    MaKhachHang varchar(10), 
    MaLoaiTietKiem varchar(10),
    SoTienGoi decimal(18,2) not null,
    NgayGoi date not null,
    NgayRut date,
    TienLaiPhatSinh decimal(18,2) not null,
    SoDu decimal(18,2) not null,
    NgayDaoHanKeTiep date not null,
    LaiSuatApDung float not null,
    TrangThai bool,
    primary key(MaPhieuGoi),
    foreign key (MaKhachHang) references KHACHHANG(MaKhachHang),
    foreign key (MaLoaiTietKiem) references LOAITIETKIEM(MaLoaiTietKiem)
);

create table BAOCAODOANHSONGAY (
	Ngay date,
    MaLoaiTietKiem varchar(10),
    TongThu decimal(18,2) not null,
    TongChi decimal(18,2) not null,
    ChenhLechThuChi decimal(18,2) not null,
	foreign key (MaLoaiTietKiem) references LOAITIETKIEM(MaLoaiTietKiem),
    primary key (Ngay, MaLoaiTietKiem)
);

create table BAOCAOSOPHIEUTHANG (
	NgayThang date,
    MaLoaiTietKiem varchar(10),
    TongPhieuGoi int not null, 
    TongPhieuDong int not null,
    ChenhLechGoiDong int not null,
    foreign key (MaLoaiTietKiem) references LOAITIETKIEM(MaLoaiTietKiem),
    primary key (NgayThang, MaLoaiTietKiem)
);

create table THAMSO (
	SoTienGuiToiThieu decimal(18,2)
);

create table CHUCNANG (
	MaChucNang varchar(10),
    TenChucNang nvarchar(100) not null,
    TenManHinhDuocLoad nvarchar(100) not null,
    primary key (MaChucNang)
);

create table NHOMNGUOIDUNG(
	MaNhom varchar(10), 
    TenNhom nvarchar(100) not null,
    primary key (MaNhom)
);

create table NGUOIDUNG(
	TenDangNhap varchar(20),
    MatKhau varchar(20),
    MaNhom varchar(10),
    foreign key (MaNhom) references NHOMNGUOIDUNG(MaNhom),
    primary key (TenDangNhap)
);

create table PHANQUYEN (
	MaNhom varchar(10),
    MaChucNang varchar(10),
    foreign key (MaNhom) references NHOMNGUOIDUNG(MaNhom),
    foreign key (MaChucNang) references CHUCNANG(MaChucNang),
    primary key  (MaNhom, MaChucNang)
);

-- thiet lap tinh nang phan quyen -> login form
-- chen field vao bang chucnang
insert into chucnang values ('CN01', 'QuanTriHeThong', 'PhanQuyen');
insert into chucnang values ('CN02', 'LapPhieuGoiTien', 'LapPhieuGoiTien');
insert into chucnang values ('CN03', 'LapPhieuRutTien', 'LapPhieuRutTien');
insert into chucnang values ('CN04', 'LapBaoCao', 'LapBaoCao');
insert into chucnang values ('CN05', 'ThayDoiQuyDinh', 'ThayDoiQuyDinh');

select * from chucnang;


-- insert field into table NhomNguoiDung
insert into NHOMNGUOIDUNG values ('N1', 'admin');
insert into NHOMNGUOIDUNG values ('N2', 'ceo');
insert into NHOMNGUOIDUNG values ('N3', 'emp');

-- insert field into table PhanQuyen
insert into PHANQUYEN values ('N1', 'CN01');
insert into PHANQUYEN values ('N2', 'CN02');
insert into PHANQUYEN values ('N2', 'CN03');
insert into PHANQUYEN values ('N2', 'CN04');
insert into PHANQUYEN values ('N2', 'CN05');
insert into PHANQUYEN values ('N3', 'CN02');
insert into PHANQUYEN values ('N3', 'CN03');
insert into PHANQUYEN values ('N3', 'CN04');

-- insert into NGUOIDUNG
insert into NGUOIDUNG values ('admin', 'password', 'N1');

-- git