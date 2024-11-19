<<<<<<< HEAD
// models/index.js
const sequelize = require("../config/db");
const CustomerModel = require("./CustomerModel");
const EmployeeModel = require("./EmployeeModel");
const PhieuXuatModel = require("./phieuXuatModel");
const FeaturePermissionModel = require("./FeaturePermissionModel");
const PermissionModel = require("./permissionModel");
const DetailPermission = require("./DetailPermission");
const ProductModel = require("./ProductModel");
const OperatingSystem = require("./OperatingSystemModel");
const Brand = require("./BrandModel");
const Origin = require("./OriginModel");
const WareHouse = require("./WareHouseModel");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");
// Thiết lập mối quan hệ
CustomerModel.hasMany(PhieuXuatModel, {
  foreignKey: "ma_kh",
  as: "phieuXuats",
});
PhieuXuatModel.belongsTo(CustomerModel, {
  foreignKey: "ma_kh",
  as: "customer",
});
=======
// models/Relationship.js
const sequelize = require('../config/db');
const CustomerModel = require('./CustomerModel');
const EmployeeModel = require('./EmployeeModel');
const PhieuXuatModel = require('./phieuXuatModel');
const FeaturePermissionModel =require('./FeaturePermissionModel');
const PermissionModel = require('./permissionModel');
const DetailPermission = require('./DetailPermission');
const ProviderModel = require('./providerModel');
const importModel = require('./ImportModel');
const ProductModel = require('./ProductModel');
const RamModel = require('./RamModel');
const RomModel = require('./RomModel');
const ColorModel = require('./ColorModel');
const PhienBanSPModel = require('./PhienBanSPModel');
const detailImport = require('./detailImportModel');
const chiTietPhieuXuatModel = require('./chiTietPhieuXuatModel');
// Thiết lập mối quan hệ Phiếu xuất
CustomerModel.hasMany(PhieuXuatModel, { foreignKey: 'ma_kh', as: 'phieuXuats' });
PhieuXuatModel.belongsTo(CustomerModel, { foreignKey: 'ma_kh', as: 'customer' });
>>>>>>> 390245f060a22729737d6709eea45df87f9f0099

EmployeeModel.hasMany(PhieuXuatModel, {
  foreignKey: "ma_nv",
  as: "phieuXuats",
});
PhieuXuatModel.belongsTo(EmployeeModel, {
  foreignKey: "ma_nv",
  as: "nhanVien",
});

// Thiết lập mối quan hệ Phân quyền
PermissionModel.belongsToMany(FeaturePermissionModel, {
  through: DetailPermission,
  foreignKey: "ma_quyen",
});
FeaturePermissionModel.belongsToMany(PermissionModel, {
  through: DetailPermission,
  foreignKey: "ma_chuc_nang",
});
PermissionModel.hasMany(EmployeeModel, { foreignKey: "ma_quyen" });
EmployeeModel.belongsTo(PermissionModel, { foreignKey: "ma_quyen" });

<<<<<<< HEAD
//product
ProductModel.belongsTo(OperatingSystem, {
  foreignKey: "hdh",
  as: "operatingSystem",
});
ProductModel.belongsTo(Brand, { foreignKey: "thuong_hieu", as: "brand" });
ProductModel.belongsTo(Origin, { foreignKey: "xuat_xu", as: "origin" });
ProductModel.belongsTo(WareHouse, {
  foreignKey: "khu_vuc_kho",
  as: "storageArea",
});
=======
// thiết lập mối quan hệ phiếu nhập
ProviderModel.hasMany(importModel,{foreignKey: 'ma_ncc' , as:'phieuNhaps'});
importModel.belongsTo(ProviderModel,{foreignKey: 'ma_ncc',as:'provider'});
EmployeeModel.hasMany(importModel,{foreignKey: 'ma_nv' , as:'phieuNhaps'});
importModel.belongsTo(EmployeeModel,{foreignKey:'ma_nv' , as:'nhanvien'});
// thiết lập mối quan hệ phiên bản sản phẩm và sản phẩm
ProductModel.hasMany(PhienBanSPModel,{foreignKey:'ma_sp' , as:'phienBanSanPhams'});
PhienBanSPModel.belongsTo(ProductModel,{foreignKey:'ma_sp',as:'product'});
//thiết lập mối quan hệ phiên bản sản phẩm và màu sắc
ColorModel.hasMany(PhienBanSPModel,{foreignKey: 'ma_mau', as:'phienBanSanPhams'});
PhienBanSPModel.belongsTo(ColorModel,{foreignKey:'ma_mau',as:'mauSac'});
// thiết lập mối quan hệ phiên bản sản phẩm và RAM
RamModel.hasMany(PhienBanSPModel,{foreignKey:'ma_ram' ,as:'phienBanSanPhams'});
PhienBanSPModel.belongsTo(RamModel,{foreignKey:'ma_ram' , as:'ram'});
// thiết lập mối quan hệ phiên bản sản phẩm và ROM
RomModel.hasMany(PhienBanSPModel,{foreignKey:'ma_rom', as:'phienBanSanPhams'});
PhienBanSPModel.belongsTo(RomModel,{foreignKey:'ma_rom', as:'rom'});
// thiết lập mối quan hệ phiên bản sản phẩm và chi tiết phiếu nhập
PhienBanSPModel.hasMany(detailImport,{foreignKey: 'ma_phien_ban_sp', as:'chiTietPhieuNhaps'});
detailImport.belongsTo(PhienBanSPModel,{foreignKey: 'ma_phien_ban_sp', as:'phienBanSanPham'});
// thiết lập mối quan hệ phiên bản sản phẩm và chi tiết phiếu xuất
PhienBanSPModel.hasMany(chiTietPhieuXuatModel,{foreignKey:'ma_phien_ban_sp',as:'chiTietPhieuXuats'});
chiTietPhieuXuatModel.belongsTo(PhienBanSPModel,{foreignKey:'ma_phien_ban_sp',as: 'phienBanSanPham'});
//thiết lập mối quan hệ phiếu nhập và chi tiết phiếu nhập
importModel.hasMany(detailImport,{foreignKey: 'ma_pn',as:'chiTietPhieuNhaps'});
detailImport.belongsTo(importModel,{foreignKey: 'ma_pn',as:'phieuNhap'});
//thiết lập mối quan hệ phiếu xuất và chi tiết phiếu xuất
PhieuXuatModel.hasMany(chiTietPhieuXuatModel,{foreignKey:'ma_px',as:'chiTietPhieuXuats'});
chiTietPhieuXuatModel.belongsTo(PhieuXuatModel,{foreignKey:'ma_px',as:'phieuXuat'});
>>>>>>> 390245f060a22729737d6709eea45df87f9f0099

// Xuất tất cả các model
module.exports = {
  sequelize,
  KhachHang: CustomerModel,
  EmployeeModel,
  PhieuXuat: PhieuXuatModel,
  Permission: PermissionModel,
  FeaturePermission: FeaturePermissionModel,
  DetailPermission,
<<<<<<< HEAD
  ProductModel,
  OperatingSystem,
  Brand,
  Origin,
  WareHouse,
=======
  Provider:ProviderModel,
  importModel,
 PhienBanSPModel,
  ProductModel,
  Ram: RamModel,
  Rom: RomModel,
  Color: ColorModel,
  chiTietPhieuXuatModel,
  detailImport
>>>>>>> 390245f060a22729737d6709eea45df87f9f0099
};
