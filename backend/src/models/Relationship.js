// models/index.js
const sequelize = require('../config/db');
const CustomerModel = require('./CustomerModel');
const EmployeeModel = require('./EmployeeModel');
const PhieuXuatModel = require('./phieuXuatModel');
const FeaturePermissionModel =require('./FeaturePermissionModel');
const PermissionModel = require('./permissionModel');
const DetailPermission = require('./DetailPermission');
// Thiết lập mối quan hệ
CustomerModel.hasMany(PhieuXuatModel, { foreignKey: 'ma_kh', as: 'phieuXuats' });
PhieuXuatModel.belongsTo(CustomerModel, { foreignKey: 'ma_kh', as: 'customer' });

EmployeeModel.hasMany(PhieuXuatModel, { foreignKey: 'ma_nv', as: 'phieuXuats' });
PhieuXuatModel.belongsTo(EmployeeModel, { foreignKey: 'ma_nv', as: 'nhanVien' });

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
// Xuất tất cả các model
module.exports = {
  sequelize,
  KhachHang: CustomerModel,
  EmployeeModel,
  PhieuXuat: PhieuXuatModel,
  Permission: PermissionModel,
  FeaturePermission: FeaturePermissionModel,
  DetailPermission
};
