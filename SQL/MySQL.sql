-- --------------------------------------------------------
-- Máy chủ:                      127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Phiên bản:           12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for quanlikhohang
CREATE DATABASE IF NOT EXISTS `quanlikhohang` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `quanlikhohang`;

-- Dumping structure for table quanlikhohang.phieu_nhap
CREATE TABLE IF NOT EXISTS `phieu_nhap` (
  `ma_pn` int(11) NOT NULL AUTO_INCREMENT,
  `ma_nv` varchar(255) DEFAULT NULL,
  `ma_ncc` int(11) DEFAULT NULL,
  `thoi_gian_nhap` datetime DEFAULT  current_timestamp(),
  `tong_tien` int(11) Not NULL DEFAULT 0,
  `trang_thai` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`ma_pn`) USING BTREE,
  KEY `ten_tk` (`ma_nv`) USING BTREE,
  KEY `ma_nha_cung_cap` (`ma_ncc`) USING BTREE,
  CONSTRAINT `fk_phieu_nhap_ma_ncc` FOREIGN KEY (`ma_ncc`) REFERENCES `nha_cung_cap` (`ma_ncc`),
  CONSTRAINT `fk_phieu_nhap_ma_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhan_vien` (`ma_nv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `phieu_nhap` (`ma_pn`,`ma_nv`,`ma_ncc`, `thoi_gian_nhap`,`tong_tien`,`trang_thai`)
VALUES
(1, 'nv2', 1, '2023-01-15 08:45:00', 585000000, 1),
(2, 'nv2', 3, '2023-03-10 10:15:00', 304500000, 1),
(3, 'nv4', 2, '2023-05-20 09:30:00', 493000000, 1),
(4, 'nv4', 4, '2023-07-08 14:20:00', 411200000, 1),
(5, 'nv4', 5, '2023-08-17 13:55:00', 728000000, 1),
(6, 'nv2', 6, '2023-09-28 11:25:00', 247000000, 1),
(7, 'nv2', 7, '2023-11-30 16:40:00', 238400000, 1),
(8, 'nv2', 8, '2024-01-25 10:10:00', 201600000, 1),
(9, 'nv2', 9, '2024-03-14 08:50:00', 101500000, 1),
(10,'nv4',10,'2024-05-20 15:35:00', 94000000, 1),
(11, 'nv4', 3, '2024-07-05 14:00:00', 210000000, 1),
(12, 'nv2', 2, '2024-08-28 13:10:00', 182000000, 1),
(13, 'nv2', 4, '2024-09-15 12:50:00', 248600000, 1),
(14, 'nv4', 1, '2024-10-05 09:30:00', 351200000, 1);

-- Dumping structure for table quanlikhohang.chi_tiet_phieu_nhap
CREATE TABLE IF NOT EXISTS `chi_tiet_phieu_nhap` (
  `ma_pn` int(11) NOT NULL,
  `ma_phien_ban_sp` int(11) DEFAULT NULL,
  `so_luong` int(11) NOT NULL,
  `gia_nhap` int(11) NOT NULL,
  KEY `ma_phien_ban_sp` (`ma_phien_ban_sp`),
  KEY `ma_phieu_nhap` (`ma_pn`) USING BTREE,
  FOREIGN KEY (`ma_pn`) REFERENCES `phieu_nhap` (`ma_pn`),
  FOREIGN KEY (`ma_phien_ban_sp`) REFERENCES `phien_ban_san_pham` (`ma_phien_ban_sp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `chi_tiet_phieu_nhap` (`ma_pn`,`ma_phien_ban_sp`,`so_luong`,`gia_nhap`)
VALUES
(1, 1, 30, 10000000),
(1, 2, 10, 10500000),
(1, 3, 15, 12000000),
(2, 4, 20, 12100000),
(2, 5, 5, 12500000),
(3, 6, 12, 12600000),
(3, 7, 18, 12600000),
(3, 8, 10, 11500000),
(4, 9, 22, 11600000),
(4, 10, 13, 12000000),
(5, 11, 19, 12000000),
(5, 12, 15, 12500000),
(5, 13, 25, 12500000),
(6, 14, 10, 13000000),
(6, 15, 9, 13000000),
(7, 16, 17, 6000000),
(7, 17, 22, 6200000),
(8, 18, 13, 6300000),
(8, 19, 19, 6300000),
(9, 20, 10, 4000000),
(9, 21, 15, 4100000),
(10, 22, 8, 4700000),
(10, 23, 12, 4700000),
(11, 24, 20, 6000000),
(11, 25, 15, 6000000),
(12, 26, 18, 6500000),
(12, 27, 10, 6500000),
(13, 28, 11, 13000000),
(13, 29, 8, 13200000),
(14, 30, 16, 13200000),
(14, 31, 10, 14000000);

-- Dumping structure for table quanlikhohang.phieu_xuat
CREATE TABLE IF NOT EXISTS `phieu_xuat` (
  `ma_px` int(11) NOT NULL AUTO_INCREMENT,
  `ma_nv` varchar(255) DEFAULT NULL,
  `ma_kh` int(11) DEFAULT NULL,
  `thoi_gian_xuat` datetime DEFAULT current_timestamp(),
  `tong_tien` int(13) DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_px`) USING BTREE,
  KEY `ten_tk` (`ma_nv`) USING BTREE,
  KEY `ma_khach_hang` (`ma_kh`) USING BTREE,
  CONSTRAINT `fk_hoa_don_ma_kh` FOREIGN KEY (`ma_kh`) REFERENCES `khach_hang` (`ma_kh`),
  CONSTRAINT `fk_hoa_don_ma_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhan_vien` (`ma_nv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `phieu_xuat` (`ma_px`,`ma_nv`,`ma_kh`, `thoi_gian_xuat`, `tong_tien`,`trang_thai`)
VALUES
(1, 'nv2', 1, '2023-02-10 14:30:00',603500000, 1),
(2, 'nv2', 3, '2023-04-01 15:20:00', 604300000, 1),
(3, 'nv2', 5, '2023-06-12 13:15:00', 293500000, 1),
(4, 'nv2', 6, '2023-08-25 17:30:00',585000000, 1),
(5, 'nv4', 3, '2023-10-19 10:10:00', 522000000, 1),
(6, 'nv4', 4, '2023-12-01 14:00:00', 427900000, 1),
(7, 'nv2', 2, '2024-02-05 11:45:00', 333000000, 1),
(8, 'nv4', 5, '2024-03-18 13:25:00', 273000000, 1),
(9, 'nv2', 2, '2024-05-11 16:35:00', 314500000, 1),
(10, 'nv4', 4, '2024-07-23 15:55:00', 550600000, 1),
(11, 'nv4', 5, '2024-09-02 09:45:00', 664500000, 1),
(12, 'nv2', 6, '2024-10-09 11:20:00', 569800000, 1);
-- Dumping structure for table quanlikhohang.chi_tiet_phieu_xuat
CREATE TABLE IF NOT EXISTS `chi_tiet_phieu_xuat` (
  `ma_px` int(11) NOT NULL,
   `ma_phien_ban_sp` int(11) DEFAULT NULL,
  `so_luong` int(11) NOT NULL,
  `gia_xuat` int(11) NOT NULL,
    KEY `ma_phien_ban_sp` (`ma_phien_ban_sp`),
  KEY `ma_phieu_xuat` (`ma_px`) USING BTREE,
  CONSTRAINT `fk_chi_tiet_hd_ma_hd` FOREIGN KEY (`ma_px`) REFERENCES `phieu_xuat` (`ma_px`),
  CONSTRAINT `fk_chi_tiet_hd_ma_phien_ban_sp` FOREIGN KEY (`ma_phien_ban_sp`) REFERENCES  `phien_ban_san_pham` (`ma_phien_ban_sp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `chi_tiet_phieu_xuat` (`ma_px`, `ma_phien_ban_sp`, `so_luong`, `gia_xuat`)
VALUES
(1, 1, 25,11000000),
(1, 2, 15, 11500000),
(1, 3, 12, 13000000),
(2, 4, 17,13100000),
(2, 5, 10,13500000),
(2, 6, 18, 13700000),
(3, 7, 10, 13700000),
(3, 8, 8, 12000000),
(3, 9, 5, 12100000),
(4, 10, 12, 13000000),
(4, 11, 15, 13000000),
(4, 12, 18, 13000000),
(5, 13, 10, 13000000),
(5, 14, 8, 14000000),
(5, 15, 20, 14000000),
(6, 16, 17, 7000000),
(6, 17, 25, 7100000),
(6, 18, 18, 7300000),
(7, 19, 30, 7300000),
(7, 20, 10, 4500000),
(7, 21, 15, 4600000),
(8, 22, 22, 5200000),
(8, 23, 18, 5200000),
(8, 24, 10, 6500000),
(9, 25, 15, 6500000),
(9, 26, 13, 7000000),
(9, 27, 18, 7000000),
(10, 28, 16, 14000000),
(10, 29, 12, 14200000),
(10, 30, 11, 14200000),
(11, 31, 27, 15000000),
(11, 1, 10, 11000000),
(11, 2, 13, 11500000),
(12, 3, 15, 13000000),
(12, 4, 8, 13100000),
(12, 5, 20, 13500000);

-- Dumping structure for table quanlikhohang.nhom_quyen
CREATE TABLE IF NOT EXISTS `nhom_quyen` (
  `ma_quyen` int(11) NOT NULL AUTO_INCREMENT,
  `ten_quyen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_quyen`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `nhom_quyen` (`ten_quyen`) VALUES
('Admin'),
('Quản lý'),
('Nhân viên kho'),
('Nhân viên kiểm toán');

-- Dumping structure for table quanlikhohang.chi_tiet_quyen
CREATE TABLE IF NOT EXISTS `chi_tiet_quyen` (
  `ma_quyen` int(11) DEFAULT NULL,
  `ma_chuc_nang` int(11) DEFAULT NULL,
  `hanh_dong` varchar(255) DEFAULT NULL,
  KEY `ma_chuc_nang` (`ma_chuc_nang`),
  KEY `ma_nhom_quyen` (`ma_quyen`) USING BTREE,
  CONSTRAINT `fk_chi_tiet_quyen_ma_chuc_nang` FOREIGN KEY (`ma_chuc_nang`) REFERENCES `chuc_nang` (`ma_chuc_nang`),
  CONSTRAINT `fk_chi_tiet_quyen_ma_quyen` FOREIGN KEY (`ma_quyen`) REFERENCES `nhom_quyen` (`ma_quyen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `chi_tiet_quyen`
INSERT INTO `chi_tiet_quyen` (`ma_quyen`, `ma_chuc_nang`, `hanh_dong`) VALUES
(1, 1, 'Thêm, sửa, xóa, xem'),
(1, 2, 'Thêm, sửa, xóa, xem'),
(1, 3, 'Thêm, sửa, xóa, xem'),
(1, 4, 'Thêm, sửa, xóa, xem'),
(1, 5, 'Thêm, sửa, xóa, xem'),
(1, 6, 'Thêm, sửa, xóa, xem'),
(1, 7, 'Thêm, sửa, xóa, xem'),
(1, 8, 'Thêm, sửa, xóa, xem'),
(1, 9, 'Thêm, sửa, xóa, xem'),
(1, 10, 'Thêm, sửa, xóa, xem'),
(1, 11, 'Thêm, sửa, xóa, xem'),
(2, 1, 'Thêm, sửa, xóa, xem'),
(2, 2, 'Thêm, sửa, xóa, xem'),
(2, 3, 'Thêm, sửa, xóa, xem'),
(2, 4, 'Thêm, sửa, xóa, xem'),
(2, 5, 'Thêm, sửa, xóa, xem'),
(2, 8, 'Thêm, sửa, xóa, xem'),
(2, 9, 'Thêm, sửa, xóa, xem'),
(2, 10, 'Thêm, sửa, xóa, xem'),
(2, 11, 'Thêm, sửa, xóa, xem'),
(3, 1, 'Thêm, sửa, xóa, xem'),
(3, 2, 'Thêm, sửa, xóa, xem'),
(3, 9, 'Thêm, sửa, xóa, xem'),
(3, 10, 'Thêm, sửa, xóa, xem'),
(3, 11, 'Thêm, sửa, xóa, xem'),
(4, 1, 'xem'),
(4, 2, 'xem'),
(4,8,'xem'),
(4, 9, 'xem'),
(4, 10, 'xem'),
(4, 11, 'xem');
-- Dumping structure for table quanlikhohang.chuc_nang
CREATE TABLE IF NOT EXISTS `chuc_nang` (
  `ma_chuc_nang` int(11) NOT NULL AUTO_INCREMENT,
  `ten_chuc_nang` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_chuc_nang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `chuc_nang`
INSERT INTO `chuc_nang` (`ten_chuc_nang`) VALUES
('Quản lý sản phẩm'),
('Quản lý khu vực kho'),
('Quản lý nhân viên'),
('Quản lý khách hàng'),
('Quản lý nhà cung cấp'),
('Quản lý tài khoản'),
('Quản lý nhóm quyền'),
('Quản lý thống kê'),
('Quản lý nhập hàng'),
('Quản lý xuất hàng'),
('Quản lý thuộc tính');


-- Dumping structure for table quanlikhohang.nhan_vien
CREATE TABLE IF NOT EXISTS `nhan_vien` (
  `ma_nv` varchar(255) NOT NULL,
  `ten_nv` varchar(255) DEFAULT NULL,
  `gioi_tinh` varchar(5) DEFAULT NULL,
  `sdt` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ma_quyen` int(11) DEFAULT NULL,
  `trang_thai` int(1) DEFAULT NULL,
  PRIMARY KEY (`ma_nv`),
  KEY `fk_quyen` (`ma_quyen`),
  FOREIGN KEY (`ma_quyen`) REFERENCES `nhom_quyen` (`ma_quyen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Thêm dữ liệu mẫu cho bảng `nhan_vien`
INSERT INTO `nhan_vien` (`ma_nv`,`ten_nv`, `gioi_tinh`, `sdt`, `email`, `mat_khau`, `ma_quyen`, `trang_thai`) VALUES
('admin','Admin','NULL','NULL','admin@gmail.com','admin',1,1),
('nv1','Lê Thị C', 'Nữ', '0966778899', 'lethic@example.com', 'password123', 2, 1),
('nv2','Nguyễn Văn E', 'Nam', '0911223344', 'nguyenvane@example.com', 'password123', 3, 1),
('nv3','Ngô Thị F', 'Nữ', '0966778899', 'ngothif@example.com', 'password123', 4, 1),
('nv4','Hoàng Xuân G', 'Nam', '0911223344', 'hoangxuang@example.com', 'password123', 3, 1);


-- Dumping structure for table quanlikhohang.he_dieu_hanh
CREATE TABLE IF NOT EXISTS `he_dieu_hanh` (
  `ma_hdh` int(11) NOT NULL AUTO_INCREMENT,
  `ten_hdh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_hdh`) USING BTREE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `he_dieu_hanh`
INSERT INTO `he_dieu_hanh` (`ten_hdh`) VALUES
('Android'),
('iOS');

-- Dumping structure for table quanlikhohang.khach_hang
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `ma_kh` int(11) NOT NULL AUTO_INCREMENT,
  `ten_kh` varchar(255) DEFAULT NULL,
  `dia_chi_kh` varchar(255) DEFAULT NULL,
  `sdt_kh` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ma_kh`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `khach_hang` (`ten_kh`,`dia_chi_kh`,`sdt_kh`) VALUES
('Nguyễn Văn A','Gia Đức, Ân Đức, Hoài Ân, Bình Định','0387913347'),
('Trần Nhất Nhất','205 Trần Hưng Đạo, Phường 10, Quận 5, Thành phố Hồ Chí Minh','0123456789'),
('Hoàng Gia Bo','Khoa Trường, Hoài Ân, Bình Định','0987654321'),
('Nguyễn Thị Minh Anh','123 Phố Huế, Quận Hai Bà Trưng, Hà Nội','0935123456'),
('Trần Đức Minh','789 Đường Lê Hồng Phong, Thành phố Đà Nẵng','0983456789'),
('Phạm Thanh Hằng','102 Lê Duẩn, Thành phố Hải Phòng','0965876543'),
('Hoàng Đức Anh','321 Lý Thường Kiệt, Thành phố Cần Thơ','0946789012');

-- Dumping structure for table quanlikhohang.nha_cung_cap
CREATE TABLE IF NOT EXISTS `nha_cung_cap` (
  `ma_ncc` int(11) NOT NULL AUTO_INCREMENT,
  `ten_ncc` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `email_ncc` varchar(255) DEFAULT NULL,
  `sdt_ncc` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`ma_ncc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `nha_cung_cap`
INSERT INTO `nha_cung_cap` (`ten_ncc`, `dia_chi`, `email_ncc`, `sdt_ncc`) VALUES
('Công ty Apple', 'Mỹ', 'contact@apple.com', '0987654321'),
('Samsung Việt Nam', 'Hà Nội', 'contact@samsung.vn', '0123456789'),
('Công ty Oppo','27 Đ. Nguyễn Trung Trực, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh','oppovietnam@oppo.vn','0456345234'),
('Công ty Xiaomi','Trung Quốc','contact@xiaomi.com','0956281536'),
('Công ty Sony','Trung Quốc','contact@sony.com','0877744422'),
('Công ty Huawei','Trung Quốc','contact@huawei.com','0956242544'),
('Công ty Google','Mỹ','contact@google.com','0233462128'),
('Công ty Asus','Đài Loan','contact@asus.com','0956666111'),
('Công ty Nokia','Phòng 703, Tầng7, Tòa Nhà Metropolitan, 235 Đồng Khởi, P. Bến Nghé, Q. 1, Tp. Hồ Chí Minh (TPHCM)','chau.nguyen@nokia.com','02838236894'),
('Công ty Realme','Trung Quốc','contact@realme.com','0111222333'),
('Công ty Poco','Trung Quốc','contact@poco.com','0112567211');

-- Dumping structure for table quanlikhohang.khu_vuc_kho
CREATE TABLE IF NOT EXISTS `khu_vuc_kho` (
  `ma_kho` int(11) NOT NULL AUTO_INCREMENT,
  `ten_kho` varchar(255) DEFAULT NULL,
  `chu_thich` varchar(255) DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_kho`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `khu_vuc_kho`
INSERT INTO `khu_vuc_kho` (`ten_kho`, `chu_thich`, `trang_thai`) VALUES
('Kho A', 'kho Apple', 1),
('Kho B', 'kho Samsung', 1),
('Kho C', 'kho Oppo', 1),
('Kho D', 'kho Xiaomi', 1),
('Kho E', 'kho Sony', 1),
('Kho F', 'kho Huawei', 1),
('Kho G', 'kho Google', 1),
('Kho H', 'kho Asus', 1),
('Kho I', 'kho Nokia', 1),
('Kho K', 'kho Realme', 1),
('Kho M', 'kho Poco', 1);

-- Dumping structure for table quanlikhohang.mau_sac
CREATE TABLE IF NOT EXISTS `mau_sac` (
  `ma_mau` int(11) NOT NULL AUTO_INCREMENT,
  `ten_mau` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ma_mau`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `mau_sac`
INSERT INTO `mau_sac` (`ten_mau`) VALUES
('Đen'),
('Trắng'),
('Xanh dương');

-- Dumping structure for table quanlikhohang.phien_ban_san_pham
CREATE TABLE IF NOT EXISTS `phien_ban_san_pham` (
  `ma_phien_ban_sp` int(11) NOT NULL AUTO_INCREMENT,
  `ma_sp` int(11) NOT NULL,
  `ma_ram` int(11) DEFAULT NULL,
  `ma_rom` int(11) DEFAULT NULL,
  `ma_mau` int(11) DEFAULT NULL,
  `gia_nhap` int(11) DEFAULT NULL,
  `gia_xuat` int(11) DEFAULT NULL,
  `ton_kho` int(11) DEFAULT 0,
  PRIMARY KEY (`ma_phien_ban_sp`),
  KEY `ma_ram` (`ma_ram`),
  KEY `ma_rom` (`ma_rom`),
  KEY `ma_mau` (`ma_mau`),
  KEY `ma_san_pham` (`ma_sp`) USING BTREE,
   FOREIGN KEY (`ma_sp`) REFERENCES `san_pham` (`ma_sp`),
   FOREIGN KEY (`ma_ram`) REFERENCES `ram` (`ma_ram`),
   FOREIGN KEY (`ma_rom`) REFERENCES `rom` (`ma_rom`),
   FOREIGN KEY (`ma_mau`) REFERENCES `mau_sac` (`ma_mau`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `phien_ban_san_pham` (`ma_sp`, `ma_ram`, `ma_rom`, `ma_mau`, `gia_nhap`, `gia_xuat`, `ton_kho`)
VALUES
(1,2,2,1,10000000,11000000,10),
(1,2,2,2,10500000,11500000,10),
(1,3,3,1,12000000,13000000,15),
(1,3,3,2,12100000,13100000,10),
(1,3,4,1,12500000,13500000,8),
(1,3,4,2,12600000,13700000,12),
(1,3,4,3,12600000,13700000,10),
(2,2,2,1,11500000,12000000,15),
(2,2,2,3,11600000,12100000,13),
(2,3,2,1,12000000,13000000,20),
(2,3,2,3,12000000,13000000,16),
(2,3,3,1,12500000,13000000,15),
(2,3,3,3,12500000,13000000,18),
(2,3,4,1,13000000,14000000,7),
(2,3,4,3,13000000,14000000,13),
(3,1,2,2,6000000,7000000,30),
(3,1,2,3,6200000,7100000,20),
(3,2,3,2,6300000,7300000,12),
(3,2,3,3,6300000,7300000,15),
(4,1,2,1,4000000,4500000,21),
(4,1,2,3,4100000,4600000,18),
(4,2,3,1,4700000,5200000,11),
(4,2,3,3,4700000,5200000,6),
(5,2,2,1,6000000,6500000,14),
(5,2,2,2,6000000,6500000,12),
(5,2,3,1,6500000,7000000,18),
(5,2,3,2,6500000,7000000,11),
(6,2,2,1,13000000,14000000,11),
(6,2,2,2,13200000,14200000,13),
(6,2,2,3,13200000,14200000,13),
(6,3,3,1,14000000,15000000,12),
(6,3,3,2,14200000,15200000,16),
(6,3,3,3,14200000,15200000,11),
(6,3,4,1,15000000,15000000,9),
(6,3,4,2,15100000,16100000,6),
(6,3,4,3,15100000,16100000,8),
(7,2,2,1,10000000,11000000,10),
(7,2,3,2,10200000,112000000,7),
(7,3,2,1,11000000,120000000,15),
(7,3,3,2,11200000,122000000,11),
(8,2,2,1,13000000,14000000,19),
(8,2,3,1,14500000,15000000,9),
(9,3,3,1,17000000,18000000,15),
(9,3,4,1,17500000,18500000,5),
(9,2,2,1,15000000,16000000,13),
(10,2,2,1,6000000,6500000,10),
(10,2,2,2,6100000,6600000,8),
(10,2,2,3,6100000,6600000,11),
(11,2,2,1,4000000,4500000,11),
(11,2,2,2,4100000,4600000,8),
(11,2,2,3,4100000,4600000,15),
(12,2,2,1,9000000,10000000,10),
(12,2,2,2,9500000,10500000,10),
(12,3,3,1,10000000,11000000,15),
(12,3,3,2,10100000,11100000,10),
(12,3,4,1,11500000,12500000,8),
(12,3,4,2,11600000,12600000,12),
(12,3,4,3,11600000,12600000,10),
(13,2,2,1,20000000,21000000,12),
(13,2,2,2,20100000,21100000,10),
(13,3,2,1,21000000,22000000,20),
(13,3,2,2,21100000,22100000,15),
(13,3,3,1,21500000,22500000,8),
(13,3,3,2,21600000,22600000,9),
(13,3,4,1,22000000,22700000,34),
(13,3,4,2,22100000,22800000,17), 
(14,2,2,1,7000000,7500000,17),
(14,2,2,3,7100000,7600000,11),
(14,2,3,1,7400000,7900000,20),
(14,2,3,3,7500000,8000000,7),
(5,2,2,1,5000000,5500000,30),
(15,2,2,3,5100000,5600000,18),
(15,2,3,1,5300000,5700000,22),
(15,2,3,3,5400000,5800000,14);

-- Dumping structure for table quanlikhohang.ram
CREATE TABLE IF NOT EXISTS `ram` (
  `ma_ram` int(11) NOT NULL AUTO_INCREMENT,
  `kich_thuoc_ram` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_ram`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `ram`
INSERT INTO `ram` (`kich_thuoc_ram`) VALUES
(4),
(8),
(16);

-- Dumping structure for table quanlikhohang.rom
CREATE TABLE IF NOT EXISTS `rom` (
  `ma_rom` int(11) NOT NULL AUTO_INCREMENT,
  `kich_thuoc_rom` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_rom`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `rom`
INSERT INTO `rom` (`kich_thuoc_rom`) VALUES
(64),
(128),
(256),
(512);

-- Dumping structure for table quanlikhohang.san_pham
CREATE TABLE IF NOT EXISTS `san_pham` (
  `ma_sp` int(11) NOT NULL AUTO_INCREMENT,
  `ten_sp` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `chip_xu_ly` varchar(255) DEFAULT NULL,
  `dung_luong_pin` int(11) DEFAULT NULL,
  `kich_thuoc_man` float DEFAULT NULL,
  `camera_truoc` varchar(255) DEFAULT NULL,
  `camera_sau` varchar(255) DEFAULT NULL,
  `hdh` int(11) DEFAULT NULL,
  `thuong_hieu` int(11) DEFAULT NULL,
  `xuat_xu` int(11) DEFAULT NULL,
  `khu_vuc_kho` int(11) DEFAULT NULL,
  `so_luong_ton` int(11) DEFAULT NULL,
  `mo_ta_sp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_sp`),
  KEY `thuong_hieu` (`thuong_hieu`),
  KEY `xuat_xu` (`xuat_xu`),
  KEY `fk_hdh` (`hdh`) USING BTREE,
  CONSTRAINT `FK1_hdh` FOREIGN KEY (`hdh`) REFERENCES `he_dieu_hanh` (`ma_hdh`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK2_thuong_hieu` FOREIGN KEY (`thuong_hieu`) REFERENCES `thuong_hieu` (`ma_thuong_hieu`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK3_xuat_xu` FOREIGN KEY (`xuat_xu`) REFERENCES `xuat_xu` (`ma_xuat_xu`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK4_khu_vuc_kho` FOREIGN KEY (`khu_vuc_kho`) REFERENCES `khu_vuc_kho` (`ma_kho`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `san_pham` (`ten_sp`, `hinh_anh`, `chip_xu_ly`, `dung_luong_pin`, `kich_thuoc_man`, `camera_truoc`, `camera_sau`, `hdh`, `thuong_hieu`, `xuat_xu`, `khu_vuc_kho`, `so_luong_ton`, `mo_ta_sp`)
VALUES
('iPhone 12', 'iphone12.jpg', 'A14 Bionic', 2815, 6.1, '12 MP', '12 MP + 12 MP', 1, 1, 3, 1, 75, 'Smartphone cao cấp từ Apple'),
('Samsung Galaxy S21', 's21.jpg', 'Exynos 2100', 4000, 6.2, '10 MP', '12 MP + 64 MP', 2, 2, 1, 2, 117, 'Smartphone cao cấp từ Samsung'),
('Oppo Find X3', 'findx3.jpg', 'Snapdragon 870', 4500, 6.7, '32 MP', '50 MP + 50 MP', 1, 3, 1, 3, 77, 'Smartphone của Oppo'),
('Xiaomi Mi 11', 'mi11.jpg', 'Snapdragon 888', 4600, 6.8, '20 MP', '108 MP + 13 MP', 1, 4, 2, 4, 56, 'Smartphone từ Xiaomi'),
('Vivo X60 Pro', 'x60pro.jpg', 'Exynos 1080', 4200, 6.6, '32 MP', '48 MP + 13 MP', 2, 3, 1, 3, 55, 'Smartphone của Vivo'),
('Sony Xperia 1 III', 'xperia1iii.jpg', 'Snapdragon 888', 4500, 6.5, '8 MP', '12 MP + 12 MP + 12 MP', 1, 5, 2, 5, 99, 'Smartphone của Sony'),
('Huawei P50 Pro', 'p50pro.jpg', 'Kirin 9000', 4360, 6.6, '13 MP', '50 MP + 40 MP', 2, 6, 2, 6, 43, 'Smartphone của Huawei'),
('Google Pixel 6', 'pixel6.jpg', 'Tensor', 4614, 6.4, '8 MP', '50 MP + 12 MP', 1, 7, 3, 7, 28, 'Smartphone của Google'),
('Asus ROG Phone 5', 'rog5.jpg', 'Snapdragon 888', 6000, 6.78, '24 MP', '64 MP + 13 MP', 1, 8, 4, 8, 33, 'Smartphone chơi game của Asus'),
('Nokia X20', 'nokix20.jpg', 'Snapdragon 480', 4470, 6.67, '32 MP', '48 MP + 5 MP', 1, 9, 1, 9, 29, 'Smartphone của Nokia'),
('Realme GT', 'gt.jpg', 'Snapdragon 888', 4500, 6.43, '16 MP', '64 MP + 8 MP', 2, 10, 2, 10, 34, 'Smartphone của Realme'),
(' iPhone 13', 'iphone13.jpg', 'A15 Bionic', 3095, 6.1, '12 MP', '12 MP + 12 MP', 1, 1, 3, 1, 75, 'Smartphone cao cấp mới của Apple'),
('Samsung Galaxy Z Fold 3', 'zfold3.jpg', 'Snapdragon 888', 4400, 7.6, '10 MP', '12 MP + 12 MP', 1, 2, 1, 3, 125, 'Điện thoại gập từ Samsung'),
('Poco F3', 'pocof3.jpg', 'Snapdragon 870', 4520, 6.67, '20 MP', '48 MP + 8 MP', 2, 11, 2, 11, 55, 'Smartphone giá rẻ từ Poco'),
('Redmi Note 10 Pro', 'note10pro.jpg', 'Snapdragon 732G', 5020, 6.67, '16 MP', '108 MP + 8 MP', 1, 4, 2, 4,84, 'Smartphone tầm trung của Xiaomi');


-- Dumping structure for table quanlikhohang.thuong_hieu
CREATE TABLE IF NOT EXISTS `thuong_hieu` (
  `ma_thuong_hieu` int(11) NOT NULL AUTO_INCREMENT,
  `ten_thuong_hieu` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_thuong_hieu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `thuong_hieu`
INSERT INTO `thuong_hieu` (`ten_thuong_hieu`) VALUES
('Apple'),
('Samsung'),
('Oppo'),
('Xiaomi'),
('Sony'),
('Huawei'),
('Google'),
('Asus'),
('Nokia'),
('Realme'),
('Poco');

-- Dumping structure for table quanlikhohang.xuat_xu
CREATE TABLE IF NOT EXISTS `xuat_xu` (
  `ma_xuat_xu` int(11) NOT NULL AUTO_INCREMENT,
  `ten_xuat_xu` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_xuat_xu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm dữ liệu mẫu cho bảng `xuat_xu`
INSERT INTO `xuat_xu` (`ten_xuat_xu`) VALUES
('Việt Nam'),
('Trung Quốc'),
('Mỹ'),
('Đài Loan');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
