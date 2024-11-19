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

EmployeeModel.hasMany(PhieuXuatModel, {
  foreignKey: "ma_nv",
  as: "phieuXuats",
});
PhieuXuatModel.belongsTo(EmployeeModel, {
  foreignKey: "ma_nv",
  as: "nhanVien",
});

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

// Xuất tất cả các model
module.exports = {
  sequelize,
  KhachHang: CustomerModel,
  EmployeeModel,
  PhieuXuat: PhieuXuatModel,
  Permission: PermissionModel,
  FeaturePermission: FeaturePermissionModel,
  DetailPermission,
  ProductModel,
  OperatingSystem,
  Brand,
  Origin,
  WareHouse,
};
