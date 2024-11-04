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

-- Dumping structure for table quanlikhohang.chi_tiet_kho
CREATE TABLE IF NOT EXISTS `chi_tiet_kho` (
  `ma_kho` int(11) DEFAULT NULL,
  `ma_sp` int(11) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  KEY `ma_kho` (`ma_kho`),
  KEY `ma_sp` (`ma_sp`),
  CONSTRAINT `FK_chi_tiet_kho_khu_vuc_kho` FOREIGN KEY (`ma_kho`) REFERENCES `khu_vuc_kho` (`ma_kho`),
  CONSTRAINT `FK_chi_tiet_kho_san_pham` FOREIGN KEY (`ma_sp`) REFERENCES `san_pham` (`ma_sp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.chi_tiet_kho: ~3 rows (approximately)
INSERT INTO `chi_tiet_kho` (`ma_kho`, `ma_sp`, `so_luong`) VALUES
	(1, 1, 15),
	(1, 2, 16),
	(2, 2, 13);

-- Dumping structure for table quanlikhohang.chi_tiet_phieu_nhap
CREATE TABLE IF NOT EXISTS `chi_tiet_phieu_nhap` (
  `ma_pn` int(11) DEFAULT NULL,
  `ma_sp` int(11) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `ma_kho` int(11) DEFAULT NULL,
  `gia_nhap` int(11) DEFAULT NULL,
  KEY `ma_sp` (`ma_sp`),
  KEY `ma_phieu_nhap` (`ma_pn`) USING BTREE,
  KEY `FK_chi_tiet_phieu_nhap_khu_vuc_kho` (`ma_kho`),
  CONSTRAINT `FK_chi_tiet_phieu_nhap_khu_vuc_kho` FOREIGN KEY (`ma_kho`) REFERENCES `khu_vuc_kho` (`ma_kho`),
  CONSTRAINT `fk_chi_tiet_pn_ma_pn` FOREIGN KEY (`ma_pn`) REFERENCES `phieu_nhap` (`ma_pn`),
  CONSTRAINT `fk_chi_tiet_pn_ma_sp` FOREIGN KEY (`ma_sp`) REFERENCES `san_pham` (`ma_sp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.chi_tiet_phieu_nhap: ~4 rows (approximately)
INSERT INTO `chi_tiet_phieu_nhap` (`ma_pn`, `ma_sp`, `so_luong`, `ma_kho`, `gia_nhap`) VALUES
	(1, 1, 3, 1, 6000000),
	(1, 2, 3, 2, 7000000),
	(2, 2, 3, 1, 6000000),
	(3, 3, 3, 3, 6000000);

-- Dumping structure for table quanlikhohang.chi_tiet_phieu_xuat
CREATE TABLE IF NOT EXISTS `chi_tiet_phieu_xuat` (
  `ma_px` int(11) DEFAULT NULL,
  `ma_sp` int(11) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `ma_kho` int(11) DEFAULT NULL,
  `gia_xuat` int(11) DEFAULT NULL,
  KEY `ma_sp` (`ma_sp`),
  KEY `FK_chi_tiet_hoa_don_khu_vuc_kho` (`ma_kho`),
  KEY `ma_phieu_xuat` (`ma_px`) USING BTREE,
  CONSTRAINT `FK_chi_tiet_hoa_don_khu_vuc_kho` FOREIGN KEY (`ma_kho`) REFERENCES `khu_vuc_kho` (`ma_kho`),
  CONSTRAINT `fk_chi_tiet_hd_ma_hd` FOREIGN KEY (`ma_px`) REFERENCES `phieu_xuat` (`ma_px`),
  CONSTRAINT `fk_chi_tiet_hd_ma_sp` FOREIGN KEY (`ma_sp`) REFERENCES `san_pham` (`ma_sp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.chi_tiet_phieu_xuat: ~4 rows (approximately)
INSERT INTO `chi_tiet_phieu_xuat` (`ma_px`, `ma_sp`, `so_luong`, `ma_kho`, `gia_xuat`) VALUES
	(1, 1, 3, 1, 5000000),
	(1, 2, 3, 2, 6000000),
	(2, 2, 3, 1, 6000000),
	(3, 3, 3, 3, 5500000);

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

-- Dumping data for table quanlikhohang.chi_tiet_quyen: ~8 rows (approximately)
INSERT INTO `chi_tiet_quyen` (`ma_quyen`, `ma_chuc_nang`, `hanh_dong`) VALUES
	(1, 4, 'quản lí sản phẩm'),
	(1, 6, 'quản lí báo cáo'),
	(1, 3, 'quản lí nhân viên'),
	(1, 1, 'quản lí quyền người dùng'),
	(1, 5, 'quản lsi phiếu nhập,hóa đơn'),
	(1, 2, 'quản lí nhà cung cấp'),
	(2, 5, 'quản lsi phiếu nhập,hóa đơn'),
	(1, 7, 'quản lí khách hàng'),
	(1, 8, 'quản lí kho'),
	(2, 7, 'quản lí khách hàng'),
	(2, 8, 'quản lí kho'),
	(2, 2, 'quản lí nhà cung cấp'),
	(2, 5, 'quản lsi phiếu nhập,hóa đơn'),
	(2, 4, 'quản lí sản phẩm'),
	(3, 6, 'quản lí báo cáo ');

-- Dumping structure for table quanlikhohang.chuc_nang
CREATE TABLE IF NOT EXISTS `chuc_nang` (
  `ma_chuc_nang` int(11) NOT NULL AUTO_INCREMENT,
  `ten_chuc_nang` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_chuc_nang`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.chuc_nang: ~8 rows (approximately)
INSERT INTO `chuc_nang` (`ma_chuc_nang`, `ten_chuc_nang`) VALUES
	(1, 'quản lí quyền người dùng'),
	(2, 'quản lí nhà cung cấp'),
	(3, 'quản lí nhân viên'),
	(4, 'quản lí sản phẩm'),
	(5, 'quản lí phiếu nhập, xuất'),
	(6, 'quản lí báo cáo , thống kê'),
	(7, 'quản lí khách hàng'),
	(8, 'quản lí kho');

-- Dumping structure for table quanlikhohang.he_dieu_hanh
CREATE TABLE IF NOT EXISTS `he_dieu_hanh` (
  `ma_hdh` int(11) NOT NULL AUTO_INCREMENT,
  `ten_hdh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_hdh`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.he_dieu_hanh: ~2 rows (approximately)
INSERT INTO `he_dieu_hanh` (`ma_hdh`, `ten_hdh`) VALUES
	(1, 'Android'),
	(2, 'iOS');

-- Dumping structure for table quanlikhohang.khach_hang
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `ma_kh` int(11) NOT NULL AUTO_INCREMENT,
  `ten_kh` varchar(255) DEFAULT NULL,
  `dia_chi_kh` varchar(255) DEFAULT NULL,
  `sdt_kh` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ma_kh`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.khach_hang: ~3 rows (approximately)
INSERT INTO `khach_hang` (`ma_kh`, `ten_kh`, `dia_chi_kh`, `sdt_kh`) VALUES
	(1, 'Khách hàng 1', 'Hà Nội', '0987654321'),
	(2, 'Khách hàng 2', 'TP. Hồ Chí Minh', '0976543210'),
	(3, 'Khách hàng 3', 'Đà Nẵng', '0965432109');

-- Dumping structure for table quanlikhohang.khu_vuc_kho
CREATE TABLE IF NOT EXISTS `khu_vuc_kho` (
  `ma_kho` int(11) NOT NULL AUTO_INCREMENT,
  `ten_kho` varchar(255) DEFAULT NULL,
  `chu_thich` varchar(255) DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_kho`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.khu_vuc_kho: ~3 rows (approximately)
INSERT INTO `khu_vuc_kho` (`ma_kho`, `ten_kho`, `chu_thich`, `trang_thai`) VALUES
	(1, 'khu vuc A', 'kho A', 1),
	(2, 'khu vuc B', 'kho B', 1),
	(3, 'khu vuc C', 'kho C', 1);

-- Dumping structure for table quanlikhohang.mau_sac
CREATE TABLE IF NOT EXISTS `mau_sac` (
  `ma_mau` int(11) NOT NULL AUTO_INCREMENT,
  `ten_mau` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ma_mau`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.mau_sac: ~3 rows (approximately)
INSERT INTO `mau_sac` (`ma_mau`, `ten_mau`) VALUES
	(1, 'Hồng'),
	(2, 'Đen'),
	(3, 'Trắng');

-- Dumping structure for table quanlikhohang.nhan_vien
CREATE TABLE IF NOT EXISTS `nhan_vien` (
  `ma_nv` int(11) NOT NULL AUTO_INCREMENT,
  `ten_nv` varchar(255) DEFAULT NULL,
  `gioi_tinh` varchar(5) DEFAULT NULL,
  `sdt` varchar(12) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ma_quyen` int(11) DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_nv`),
  KEY `fk_quyen` (`ma_quyen`),
  CONSTRAINT `fk_nhan_vien_ma_quyen` FOREIGN KEY (`ma_quyen`) REFERENCES `nhom_quyen` (`ma_quyen`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.nhan_vien: ~3 rows (approximately)
INSERT INTO `nhan_vien` (`ma_nv`, `ten_nv`, `gioi_tinh`, `sdt`, `email`, `mat_khau`, `ma_quyen`, `trang_thai`) VALUES
	(1, 'Nguyễn Văn A', 'Nam', '0911111111', 'nguyenvana@example.com', 'password123', 1, 1),
	(2, 'Trần Thị B', 'Nữ', '0922222222', 'tranthib@example.com', 'password123', 2, 1),
	(3, 'Lê Văn C', 'Nam', '0933333333', 'levanc@example.com', 'password123', 3, 1);

-- Dumping structure for table quanlikhohang.nha_cung_cap
CREATE TABLE IF NOT EXISTS `nha_cung_cap` (
  `ma_ncc` int(11) NOT NULL AUTO_INCREMENT,
  `ten_ncc` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `email_ncc` varchar(255) DEFAULT NULL,
  `sdt_ncc` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ma_ncc`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.nha_cung_cap: ~3 rows (approximately)
INSERT INTO `nha_cung_cap` (`ma_ncc`, `ten_ncc`, `dia_chi`, `email_ncc`, `sdt_ncc`) VALUES
	(1, 'Nhà cung cấp 1', 'Hải Phòng', 'ncc1@example.com', '0912345678'),
	(2, 'Nhà cung cấp 2', 'Cần Thơ', 'ncc2@example.com', '0923456789'),
	(3, 'Nhà cung cấp 3', 'Huế', 'ncc3@example.com', '0934567890');

-- Dumping structure for table quanlikhohang.nhom_quyen
CREATE TABLE IF NOT EXISTS `nhom_quyen` (
  `ma_quyen` int(11) NOT NULL AUTO_INCREMENT,
  `ten_quyen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_quyen`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.nhom_quyen: ~3 rows (approximately)
INSERT INTO `nhom_quyen` (`ma_quyen`, `ten_quyen`) VALUES
	(1, 'Admin'),
	(2, 'nhân viên quản lí kho\r\n'),
	(3, 'kế toán');

-- Dumping structure for table quanlikhohang.phien_ban_san_pham
CREATE TABLE IF NOT EXISTS `phien_ban_san_pham` (
  `ma_phien_ban` int(11) NOT NULL AUTO_INCREMENT,
  `ma_sp` int(11) NOT NULL,
  `ma_ram` int(11) DEFAULT NULL,
  `ma_rom` int(11) DEFAULT NULL,
  `ma_mau` int(11) DEFAULT NULL,
  `gia_nhap` int(11) DEFAULT NULL,
  `gia_xuat` int(11) DEFAULT NULL,
  `khu_vuc_kho` int(11) DEFAULT NULL,
  `ton_kho` int(11) DEFAULT 0,
  PRIMARY KEY (`ma_phien_ban`),
  KEY `ma_ram` (`ma_ram`),
  KEY `ma_rom` (`ma_rom`),
  KEY `ma_mau` (`ma_mau`),
  KEY `ma_san_pham` (`ma_sp`) USING BTREE,
  CONSTRAINT `FK4_masp` FOREIGN KEY (`ma_sp`) REFERENCES `san_pham` (`ma_sp`),
  CONSTRAINT `phien_ban_san_pham_ibfk_2` FOREIGN KEY (`ma_ram`) REFERENCES `ram` (`ma_ram`),
  CONSTRAINT `phien_ban_san_pham_ibfk_3` FOREIGN KEY (`ma_rom`) REFERENCES `rom` (`ma_rom`),
  CONSTRAINT `phien_ban_san_pham_ibfk_4` FOREIGN KEY (`ma_mau`) REFERENCES `mau_sac` (`ma_mau`),
  CONSTRAINT `phien_ban_san_pham` FOREIGN KEY (`ma_kho`) REFERENCES `khu_vuc_kho`
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.phien_ban_san_pham: ~10 rows (approximately)
INSERT INTO `phien_ban_san_pham` (`ma_phien_ban`, `ma_sp`, `ma_ram`, `ma_rom`, `ma_mau`, `gia_nhap`, `gia_xuat`, `ton_kho`) VALUES
	(1, 1, 1, 1, 1, 5000000, 6000000, 10 ,1),
	(2, 1, 1, 2, 2, 5500000, 6500000, 15,1),
	(3, 1, 2, 1, 3, 6000000, 7000000, 8,2),
	(4, 2, 1, 2, 1, 5700000, 6700000, 12,2),
	(5, 2, 2, 2, 2, 6200000, 7200000, 20,2),
	(6, 2, 2, 3, 3, 6500000, 7500000, 7,2),
	(7, 3, 1, 1, 1, 4500000, 5500000, 25,2),
	(8, 3, 2, 1, 2, 4900000, 5900000, 18,2),
	(9, 4, 1, 3, 3, 7000000, 8000000, 5,1),
	(10, 5, 3, 3, 2, 7500000, 8500000, 10,1),
  (11,5,3,2,1,7700000,9000000,5,2),

-- Dumping structure for table quanlikhohang.phieu_nhap
CREATE TABLE IF NOT EXISTS `phieu_nhap` (
  `ma_pn` int(11) NOT NULL AUTO_INCREMENT,
  `ma_nv` int(11) DEFAULT NULL,
  `ma_ncc` int(11) DEFAULT NULL,
  `thoi_gian_nhap` datetime DEFAULT NULL,
  `tong_tien` int(11) DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_pn`) USING BTREE,
  KEY `ten_tk` (`ma_nv`) USING BTREE,
  KEY `ma_nha_cung_cap` (`ma_ncc`) USING BTREE,
  CONSTRAINT `fk_phieu_nhap_ma_ncc` FOREIGN KEY (`ma_ncc`) REFERENCES `nha_cung_cap` (`ma_ncc`),
  CONSTRAINT `fk_phieu_nhap_ma_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhan_vien` (`ma_nv`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.phieu_nhap: ~3 rows (approximately)
INSERT INTO `phieu_nhap` (`ma_pn`, `ma_nv`, `ma_ncc`, `thoi_gian_nhap`, `tong_tien`, `trang_thai`) VALUES
	(1, 1, 1, '2024-10-01 10:00:00', 3400500, 1),
	(2, 2, 2, '2024-10-02 11:00:00', 4530000, 1),
	(3, 1, 1, '2024-10-03 12:00:00', 6453000, 1);

-- Dumping structure for table quanlikhohang.phieu_xuat
CREATE TABLE IF NOT EXISTS `phieu_xuat` (
  `ma_px` int(11) NOT NULL AUTO_INCREMENT,
  `ma_nv` int(11) DEFAULT NULL,
  `ma_kh` int(11) DEFAULT NULL,
  `thoi_gian_xuat` datetime DEFAULT NULL,
  `tong_tien` int(11) DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_px`) USING BTREE,
  KEY `ten_tk` (`ma_nv`) USING BTREE,
  KEY `ma_khach_hang` (`ma_kh`) USING BTREE,
  CONSTRAINT `fk_hoa_don_ma_kh` FOREIGN KEY (`ma_kh`) REFERENCES `khach_hang` (`ma_kh`),
  CONSTRAINT `fk_hoa_don_ma_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhan_vien` (`ma_nv`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.phieu_xuat: ~3 rows (approximately)
INSERT INTO `phieu_xuat` (`ma_px`, `ma_nv`, `ma_kh`, `thoi_gian_xuat`, `tong_tien`, `trang_thai`) VALUES
	(1, 1, 1, '2024-10-05 14:00:00', 2000002, 1),
	(2, 2, 2, '2024-10-06 15:00:00', 3000044, 1),
	(3, 1, 1, '2024-10-07 16:00:00', 4300000, 1);

-- Dumping structure for table quanlikhohang.ram
CREATE TABLE IF NOT EXISTS `ram` (
  `ma_ram` int(11) NOT NULL AUTO_INCREMENT,
  `kich_thuoc_ram` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_ram`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.ram: ~3 rows (approximately)
INSERT INTO `ram` (`ma_ram`, `kich_thuoc_ram`) VALUES
	(1, 4),
	(2, 6),
	(3, 12);

-- Dumping structure for table quanlikhohang.rom
CREATE TABLE IF NOT EXISTS `rom` (
  `ma_rom` int(11) NOT NULL AUTO_INCREMENT,
  `kich_thuoc_rom` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_rom`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.rom: ~4 rows (approximately)
INSERT INTO `rom` (`ma_rom`, `kich_thuoc_rom`) VALUES
	(1, 32),
	(2, 64),
	(3, 128),
	(4, 256);

-- Dumping structure for table quanlikhohang.san_pham
CREATE TABLE IF NOT EXISTS `san_pham` (
  `ma_sp` int(11) NOT NULL AUTO_INCREMENT,
  `ten_sp` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `chip_xu_ly` varchar(255) DEFAULT NULL,
  `dung_luong_pin` int(11) DEFAULT NULL,
  `hdh` int(11) DEFAULT NULL,
  `thuong_hieu` int(11) DEFAULT NULL,
  `xuat_xu` int(11) DEFAULT NULL,
  `mo_ta_sp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_sp`),
  KEY `thuong_hieu` (`thuong_hieu`),
  KEY `xuat_xu` (`xuat_xu`),
  KEY `fk_hdh` (`hdh`) USING BTREE,
  CONSTRAINT `FK1_hdh` FOREIGN KEY (`hdh`) REFERENCES `he_dieu_hanh` (`ma_hdh`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK2_thuong_hieu` FOREIGN KEY (`thuong_hieu`) REFERENCES `thuong_hieu` (`ma_thuong_hieu`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK3_xuat_xu` FOREIGN KEY (`xuat_xu`) REFERENCES `xuat_xu` (`ma_xuat_xu`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.san_pham: ~25 rows (approximately)
INSERT INTO `san_pham` (`ma_sp`, `ten_sp`, `hinh_anh`, `chip_xu_ly`, `dung_luong_pin`, `hdh`, `thuong_hieu`, `xuat_xu`, `mo_ta_sp`) VALUES
	(1, 'iPhone 17', 'iphone17.jpg', 'A16', 5000, 2, 2, 2, 'Điện thoại thông minh iPhone 17'),
	(2, 'iPhone 13', 'iphone13.jpg', 'A15 Bionic', 3095, 2, 2, 2, 'Điện thoại thông minh iPhone 13'),
	(3, 'OnePlus 9', 'oneplus9.jpg', 'Snapdragon 888', 4500, 1, 3, 3, 'Điện thoại thông minh OnePlus 9'),
	(4, 'Samsung Galaxy Note 20', 'note20.jpg', 'Exynos 990', 4000, 1, 1, 1, 'Điện thoại thông minh Samsung Galaxy Note 20'),
	(5, 'iPhone 12', 'iphone12.jpg', 'A14 Bionic', 2815, 2, 2, 2, 'Điện thoại thông minh iPhone 12'),
	(6, 'Samsung Galaxy S21', 's21.jpg', 'Exynos 2100', 4000, 1, 1, 1, 'Điện thoại thông minh Samsung Galaxy S21'),
	(7, 'Samsung Galaxy A52', 'a52.jpg', 'Snapdragon 720G', 4500, 1, 1, 1, 'Điện thoại thông minh Samsung Galaxy A52'),
	(8, 'Samsung Galaxy Z Flip 3', 'zflip3.jpg', 'Snapdragon 888', 3300, 1, 1, 1, 'Điện thoại gập Samsung Galaxy Z Flip 3'),
	(9, 'iPhone 14', 'iphone14.jpg', 'A16 Bionic', 3200, 2, 2, 2, 'Điện thoại thông minh iPhone 14'),
	(10, 'iPhone 15 Pro', 'iphone15pro.jpg', 'A17 Bionic', 3300, 2, 2, 2, 'Điện thoại thông minh iPhone 15 Pro'),
	(11, 'iPhone SE (2023)', 'iphonese2023.jpg', 'A15 Bionic', 2018, 2, 2, 2, 'Điện thoại thông minh iPhone SE (2023)'),
	(12, 'OnePlus Nord 2', 'nord2.jpg', 'Dimensity 1200', 4500, 1, 3, 3, 'Điện thoại thông minh OnePlus Nord 2'),
	(13, 'OnePlus 10 Pro', '10pro.jpg', 'Snapdragon 8 Gen 1', 5000, 1, 3, 1, 'Điện thoại thông minh OnePlus 10 Pro'),
	(14, 'OnePlus 8T', '8t.jpg', 'Snapdragon 865', 4500, 1, 3, 2, 'Điện thoại thông minh OnePlus 8T'),
	(15, 'Samsung Galaxy Note 21', 'note21.jpg', 'Exynos 2200', 5000, 1, 1, 2, 'Điện thoại thông minh Samsung Galaxy Note 21'),
	(16, 'Samsung Galaxy M32', 'm32.jpg', 'Helio G80', 6000, 1, 1, 3, 'Điện thoại thông minh Samsung Galaxy M32'),
	(17, 'Samsung Galaxy A32', 'a32.jpg', 'Snapdragon 720G', 5000, 1, 1, 1, 'Điện thoại thông minh Samsung Galaxy A32'),
	(18, 'iPhone 11 Pro', 'iphone11pro.jpg', 'A13 Bionic', 3046, 2, 2, 2, 'Điện thoại thông minh iPhone 11 Pro'),
	(19, 'iPhone XR', 'iphonexr.jpg', 'A12 Bionic', 2942, 2, 2, 3, 'Điện thoại thông minh iPhone XR'),
	(20, 'OnePlus 7T', '7t.jpg', 'Snapdragon 855+', 3800, 1, 3, 1, 'Điện thoại thông minh OnePlus 7T'),
	(21, 'OnePlus 9R', '9r.jpg', 'Snapdragon 870', 4500, 1, 3, 2, 'Điện thoại thông minh OnePlus 9R'),
	(22, 'Samsung Galaxy A71', 'a71.jpg', 'Snapdragon 730', 4500, 1, 1, 3, 'Điện thoại thông minh Samsung Galaxy A71'),
	(23, 'Samsung Galaxy F22', 'f22.jpg', 'Helio G80', 6000, 1, 1, 2, 'Điện thoại thông minh Samsung Galaxy F22'),
	(24, 'iPhone 14 Plus', 'iphone14plus.jpg', 'A16 Bionic', 4323, 2, 2, 1, 'Điện thoại thông minh iPhone 14 Plus'),
	(25, 'iPhone 13 Mini', 'iphone13mini.jpg', 'A15 Bionic', 2406, 2, 2, 3, 'Điện thoại thông minh iPhone 13 Mini');

-- Dumping structure for table quanlikhohang.thuong_hieu
CREATE TABLE IF NOT EXISTS `thuong_hieu` (
  `ma_thuong_hieu` int(11) NOT NULL AUTO_INCREMENT,
  `ten_thuong_hieu` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_thuong_hieu`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.thuong_hieu: ~3 rows (approximately)
INSERT INTO `thuong_hieu` (`ma_thuong_hieu`, `ten_thuong_hieu`) VALUES
	(1, 'Samsung'),
	(2, 'iPhone'),
	(3, 'OnePlus');

-- Dumping structure for table quanlikhohang.xuat_xu
CREATE TABLE IF NOT EXISTS `xuat_xu` (
  `ma_xuat_xu` int(11) NOT NULL AUTO_INCREMENT,
  `ten_xuat_xu` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_xuat_xu`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.xuat_xu: ~3 rows (approximately)
INSERT INTO `xuat_xu` (`ma_xuat_xu`, `ten_xuat_xu`) VALUES
	(1, 'Trung Quốc'),
	(2, 'Mỹ'),
	(3, 'Hàn Quốc');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
