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

-- Dumping structure for table quanlikhohang.chi_tiet_hoa_don
CREATE TABLE IF NOT EXISTS `chi_tiet_hoa_don` (
  `ma_hd` int(11) DEFAULT NULL,
  `ma_sp` int(11) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `ma_kho` int(11) DEFAULT NULL,
  `gia_xuat` int(11) DEFAULT NULL,
  KEY `ma_sp` (`ma_sp`),
  KEY `ma_phieu_xuat` (`ma_hd`) USING BTREE,
  KEY `FK_chi_tiet_hoa_don_khu_vuc_kho` (`ma_kho`),
  CONSTRAINT `FK_chi_tiet_hoa_don_khu_vuc_kho` FOREIGN KEY (`ma_kho`) REFERENCES `khu_vuc_kho` (`ma_kho`),
  CONSTRAINT `fk_chi_tiet_hd_ma_hd` FOREIGN KEY (`ma_hd`) REFERENCES `hoa_don` (`ma_hd`),
  CONSTRAINT `fk_chi_tiet_hd_ma_sp` FOREIGN KEY (`ma_sp`) REFERENCES `san_pham` (`ma_sp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.chi_tiet_hoa_don: ~4 rows (approximately)
INSERT INTO `chi_tiet_hoa_don` (`ma_hd`, `ma_sp`, `so_luong`, `ma_kho`, `gia_xuat`) VALUES
	(1, 1, 3, 1, 5000000),
	(1, 2, 3, 2, 6000000),
	(2, 2, 3, 1, 6000000),
	(3, 3, 3, 3, 5500000);

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

-- Dumping structure for table quanlikhohang.chi_tiet_quyen
CREATE TABLE IF NOT EXISTS `chi_tiet_quyen` (
  `ma_quyen` int(11) DEFAULT NULL,
  `ma_chuc_nang` int(11) DEFAULT NULL,
  KEY `ma_chuc_nang` (`ma_chuc_nang`),
  KEY `ma_nhom_quyen` (`ma_quyen`) USING BTREE,
  CONSTRAINT `fk_chi_tiet_quyen_ma_chuc_nang` FOREIGN KEY (`ma_chuc_nang`) REFERENCES `chuc_nang` (`ma_chuc_nang`),
  CONSTRAINT `fk_chi_tiet_quyen_ma_quyen` FOREIGN KEY (`ma_quyen`) REFERENCES `nhom_quyen` (`ma_quyen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.chi_tiet_quyen: ~15 rows (approximately)
INSERT INTO `chi_tiet_quyen` (`ma_quyen`, `ma_chuc_nang`) VALUES
	(1, 4),
	(1, 6),
	(1, 3),
	(1, 1),
	(1, 5),
	(1, 2),
	(2, 5),
	(1, 7),
	(1, 8),
	(2, 7),
	(2, 8),
	(2, 2),
	(2, 5),
	(2, 4),
	(3, 6);

-- Dumping structure for table quanlikhohang.chuc_nang
CREATE TABLE IF NOT EXISTS `chuc_nang` (
  `ma_chuc_nang` int(11) NOT NULL,
  `ten_chuc_nang` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_chuc_nang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- Dumping structure for table quanlikhohang.hoa_don
CREATE TABLE IF NOT EXISTS `hoa_don` (
  `ma_hd` int(11) NOT NULL,
  `ma_nv` int(11) DEFAULT NULL,
  `ma_kh` int(11) DEFAULT NULL,
  `thoi_gian_xuat` datetime DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_hd`) USING BTREE,
  KEY `ten_tk` (`ma_nv`) USING BTREE,
  KEY `ma_khach_hang` (`ma_kh`) USING BTREE,
  CONSTRAINT `fk_hoa_don_ma_kh` FOREIGN KEY (`ma_kh`) REFERENCES `khach_hang` (`ma_kh`),
  CONSTRAINT `fk_hoa_don_ma_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhan_vien` (`ma_nv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.hoa_don: ~3 rows (approximately)
INSERT INTO `hoa_don` (`ma_hd`, `ma_nv`, `ma_kh`, `thoi_gian_xuat`, `trang_thai`) VALUES
	(1, 1, 1, '2024-10-05 14:00:00', 1),
	(2, 2, 2, '2024-10-06 15:00:00', 1),
	(3, 1, 1, '2024-10-07 16:00:00', 1);

-- Dumping structure for table quanlikhohang.khach_hang
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `ma_kh` int(11) NOT NULL,
  `ten_kh` varchar(255) DEFAULT NULL,
  `dia_chi_kh` varchar(255) DEFAULT NULL,
  `sdt_kh` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ma_kh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.khach_hang: ~3 rows (approximately)
INSERT INTO `khach_hang` (`ma_kh`, `ten_kh`, `dia_chi_kh`, `sdt_kh`) VALUES
	(1, 'Khách hàng 1', 'Hà Nội', '0987654321'),
	(2, 'Khách hàng 2', 'TP. Hồ Chí Minh', '0976543210'),
	(3, 'Khách hàng 3', 'Đà Nẵng', '0965432109');

-- Dumping structure for table quanlikhohang.khu_vuc_kho
CREATE TABLE IF NOT EXISTS `khu_vuc_kho` (
  `ma_kho` int(11) NOT NULL,
  `ten_kho` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_kho`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.khu_vuc_kho: ~3 rows (approximately)
INSERT INTO `khu_vuc_kho` (`ma_kho`, `ten_kho`) VALUES
	(1, 'Hà Nội'),
	(2, 'TP. Hồ Chí Minh'),
	(3, 'Đà Nẵng');

-- Dumping structure for table quanlikhohang.mau_sac
CREATE TABLE IF NOT EXISTS `mau_sac` (
  `ma_mau` int(11) NOT NULL,
  `ten_mau` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ma_mau`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.mau_sac: ~3 rows (approximately)
INSERT INTO `mau_sac` (`ma_mau`, `ten_mau`) VALUES
	(1, 'Hồng'),
	(2, 'Đen'),
	(3, 'Trắng');

-- Dumping structure for table quanlikhohang.nhan_vien
CREATE TABLE IF NOT EXISTS `nhan_vien` (
  `ma_nv` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.nhan_vien: ~3 rows (approximately)
INSERT INTO `nhan_vien` (`ma_nv`, `ten_nv`, `gioi_tinh`, `sdt`, `email`, `mat_khau`, `ma_quyen`, `trang_thai`) VALUES
	(1, 'Nguyễn Văn A', 'Nam', '0911111111', 'nguyenvana@example.com', 'password123', 1, 1),
	(2, 'Trần Thị B', 'Nữ', '0922222222', 'tranthib@example.com', 'password123', 2, 1),
	(3, 'Lê Văn C', 'Nam', '0933333333', 'levanc@example.com', 'password123', 3, 1);

-- Dumping structure for table quanlikhohang.nha_cung_cap
CREATE TABLE IF NOT EXISTS `nha_cung_cap` (
  `ma_ncc` int(11) NOT NULL,
  `ten_ncc` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `email_ncc` varchar(255) DEFAULT NULL,
  `sdt_ncc` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ma_ncc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.nha_cung_cap: ~3 rows (approximately)
INSERT INTO `nha_cung_cap` (`ma_ncc`, `ten_ncc`, `dia_chi`, `email_ncc`, `sdt_ncc`) VALUES
	(1, 'Nhà cung cấp 1', 'Hải Phòng', 'ncc1@example.com', '0912345678'),
	(2, 'Nhà cung cấp 2', 'Cần Thơ', 'ncc2@example.com', '0923456789'),
	(3, 'Nhà cung cấp 3', 'Huế', 'ncc3@example.com', '0934567890');

-- Dumping structure for table quanlikhohang.nhom_quyen
CREATE TABLE IF NOT EXISTS `nhom_quyen` (
  `ma_quyen` int(11) NOT NULL,
  `ten_quyen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_quyen`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.nhom_quyen: ~3 rows (approximately)
INSERT INTO `nhom_quyen` (`ma_quyen`, `ten_quyen`) VALUES
	(1, 'Admin'),
	(2, 'nhân viên quản lí kho\r\n'),
	(3, 'kế toán');

-- Dumping structure for table quanlikhohang.phieu_nhap
CREATE TABLE IF NOT EXISTS `phieu_nhap` (
  `ma_pn` int(11) NOT NULL,
  `ma_nv` int(11) DEFAULT NULL,
  `ma_ncc` int(11) DEFAULT NULL,
  `thoi_gian_nhap` datetime DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_pn`) USING BTREE,
  KEY `ten_tk` (`ma_nv`) USING BTREE,
  KEY `ma_nha_cung_cap` (`ma_ncc`) USING BTREE,
  CONSTRAINT `fk_phieu_nhap_ma_ncc` FOREIGN KEY (`ma_ncc`) REFERENCES `nha_cung_cap` (`ma_ncc`),
  CONSTRAINT `fk_phieu_nhap_ma_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhan_vien` (`ma_nv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.phieu_nhap: ~3 rows (approximately)
INSERT INTO `phieu_nhap` (`ma_pn`, `ma_nv`, `ma_ncc`, `thoi_gian_nhap`, `trang_thai`) VALUES
	(1, 1, 1, '2024-10-01 10:00:00', 1),
	(2, 2, 2, '2024-10-02 11:00:00', 1),
	(3, 1, 1, '2024-10-03 12:00:00', 1);

-- Dumping structure for table quanlikhohang.ram
CREATE TABLE IF NOT EXISTS `ram` (
  `ma_ram` int(11) NOT NULL,
  `kich_thuoc_ram` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_ram`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.ram: ~3 rows (approximately)
INSERT INTO `ram` (`ma_ram`, `kich_thuoc_ram`) VALUES
	(1, 4),
	(2, 6),
	(3, 12);

-- Dumping structure for table quanlikhohang.rom
CREATE TABLE IF NOT EXISTS `rom` (
  `ma_rom` int(11) NOT NULL,
  `kich_thuoc_rom` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_rom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.rom: ~4 rows (approximately)
INSERT INTO `rom` (`ma_rom`, `kich_thuoc_rom`) VALUES
	(1, 32),
	(2, 64),
	(3, 128),
	(4, 256);

-- Dumping structure for table quanlikhohang.san_pham
CREATE TABLE IF NOT EXISTS `san_pham` (
  `ma_sp` int(11) NOT NULL,
  `ten_sp` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `chip_xu_ly` varchar(255) DEFAULT NULL,
  `dung_luong_pin` int(11) DEFAULT NULL,
  `hdh` int(11) DEFAULT NULL,
  `ram` int(11) DEFAULT NULL,
  `rom` int(11) DEFAULT NULL,
  `mau_sac` int(11) DEFAULT NULL,
  `thuong_hieu` int(11) DEFAULT NULL,
  `xuat_xu` int(11) DEFAULT NULL,
  `mo_ta_sp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_sp`),
  KEY `ram` (`ram`),
  KEY `rom` (`rom`),
  KEY `mau_sac` (`mau_sac`),
  KEY `thuong_hieu` (`thuong_hieu`),
  KEY `xuat_xu` (`xuat_xu`),
  KEY `fk_hdh` (`hdh`) USING BTREE,
  CONSTRAINT `fk_san_pham_hdh` FOREIGN KEY (`hdh`) REFERENCES `he_dieu_hanh` (`ma_hdh`),
  CONSTRAINT `fk_san_pham_mau_sac` FOREIGN KEY (`mau_sac`) REFERENCES `mau_sac` (`ma_mau`),
  CONSTRAINT `fk_san_pham_ram` FOREIGN KEY (`ram`) REFERENCES `ram` (`ma_ram`),
  CONSTRAINT `fk_san_pham_rom` FOREIGN KEY (`rom`) REFERENCES `rom` (`ma_rom`),
  CONSTRAINT `fk_san_pham_thuong_hieu` FOREIGN KEY (`thuong_hieu`) REFERENCES `thuong_hieu` (`ma_thuong_hieu`),
  CONSTRAINT `fk_san_pham_xuat_xu` FOREIGN KEY (`xuat_xu`) REFERENCES `xuat_xu` (`ma_xuat_xu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.san_pham: ~3 rows (approximately)
INSERT INTO `san_pham` (`ma_sp`, `ten_sp`, `hinh_anh`, `chip_xu_ly`, `dung_luong_pin`, `hdh`, `ram`, `rom`, `mau_sac`, `thuong_hieu`, `xuat_xu`, `mo_ta_sp`) VALUES
	(1, 'iPhone 17', 'iphone17.jpg', 'A16', 5000, 2, 2, 3, 2, 2, 2, 'Điện thoại thông minh iPhone 17'),
	(2, 'iPhone 13', 'iphone13.jpg', 'A15 Bionic', 3095, 2, 2, 2, 2, 2, 2, 'Điện thoại thông minh iPhone 13'),
	(3, 'OnePlus 9', 'oneplus9.jpg', 'Snapdragon 888', 4500, 1, 3, 3, 3, 3, 3, 'Điện thoại thông minh OnePlus 9'),
	(4, 'Samsung Galaxy Note 20', 'note20.jpg', 'Exynos 990', 4000, 1, 2, 2, 1, 1, 1, 'Điện thoại thông minh Samsung Galaxy Note 20'),
	(5, 'iPhone 12', 'iphone12.jpg', 'A14 Bionic', 2815, 2, 1, 2, 2, 2, 2, 'Điện thoại thông minh iPhone 12');

-- Dumping structure for table quanlikhohang.thuong_hieu
CREATE TABLE IF NOT EXISTS `thuong_hieu` (
  `ma_thuong_hieu` int(11) NOT NULL,
  `ten_thuong_hieu` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_thuong_hieu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table quanlikhohang.thuong_hieu: ~3 rows (approximately)
INSERT INTO `thuong_hieu` (`ma_thuong_hieu`, `ten_thuong_hieu`) VALUES
	(1, 'Samsung'),
	(2, 'iPhone'),
	(3, 'OnePlus');

-- Dumping structure for table quanlikhohang.xuat_xu
CREATE TABLE IF NOT EXISTS `xuat_xu` (
  `ma_xuat_xu` int(11) NOT NULL,
  `ten_xuat_xu` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_xuat_xu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
