// models/index.js
const sequelize = require('../config/db');
const CustomerModel = require('./CustomerModel');
const EmployeeModel = require('./EmployeeModel');
const PhieuXuatModel = require('./phieuXuatModel');

// Thiết lập mối quan hệ
CustomerModel.hasMany(PhieuXuatModel, { foreignKey: 'ma_kh', as: 'phieuXuats' });
PhieuXuatModel.belongsTo(CustomerModel, { foreignKey: 'ma_kh', as: 'customer' });

EmployeeModel.hasMany(PhieuXuatModel, { foreignKey: 'ma_nv', as: 'phieuXuats' });
PhieuXuatModel.belongsTo(EmployeeModel, { foreignKey: 'ma_nv', as: 'nhanVien' });

// Xuất tất cả các model
module.exports = {
  sequelize,
  KhachHang: CustomerModel, // Đổi tên CustomerModel thành KhachHang
  EmployeeModel,
  PhieuXuat: PhieuXuatModel
};
