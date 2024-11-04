const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Employee = db.define('Employee', {
  ma_nv: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ten_nv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Thêm các thuộc tính khác nếu cần
}, {
  tableName: 'nhan_vien',
  timestamps: false,
});

module.exports = {
  // Lấy tất cả nhân viên
  getAll: async () => {
    try {
      return await Employee.findAll();
    } catch (error) {
      throw new Error('Lỗi khi tải danh sách nhân viên: ' + error.message);
    }
  },

  // Lấy thông tin nhân viên theo mã nhân viên
  getByMaNV: async (ma_nv) => {
    try {
      const employee = await Employee.findOne({
        where: { ma_nv }
      });
      if (!employee) throw new Error('Không tìm thấy nhân viên');
      return employee;
    } catch (error) {
      throw new Error('Lỗi khi tìm nhân viên với mã: ' + ma_nv + ', lỗi: ' + error.message);
    }
  },

  // Tạo mới một nhân viên
  create: async (employeeData) => {
    try {
      return await Employee.create(employeeData);
    } catch (error) {
      throw new Error('Lỗi khi thêm nhân viên: ' + error.message);
    }
  },

  // Cập nhật thông tin nhân viên
  update: async (ma_nv, employeeData) => {
    try {
      const [affectedRows] = await Employee.update(employeeData, {
        where: { ma_nv }
      });
      if (affectedRows === 0) throw new Error('Không tìm thấy nhân viên để cập nhật');
      return affectedRows;
    } catch (error) {
      throw new Error('Lỗi khi cập nhật nhân viên với mã: ' + ma_nv + ', lỗi: ' + error.message);
    }
  },

  // Xóa nhân viên
  delete: async (ma_nv) => {
    try {
      const affectedRows = await Employee.destroy({
        where: { ma_nv }
      });
      if (affectedRows === 0) throw new Error('Không tìm thấy nhân viên để xóa');
      return affectedRows;
    } catch (error) {
      throw new Error('Lỗi khi xóa nhân viên với mã: ' + ma_nv + ', lỗi: ' + error.message);
    }
  }
};