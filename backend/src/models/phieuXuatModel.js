const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('../models/CustomerModel');
const Employee =require('../models/EmployeeModel');
const Invoice = sequelize.define('Invoice', {
    ma_px: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ma_kh: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'ma_kh',
        },
    },
    ma_nv: {
        type: DataTypes.INTEGER,
        references:{
            model : Employee,
            key: 'ma_nv',
        }
    },
    thoi_gian_xuat: {
        type: DataTypes.DATE,
    },
    tong_tien: {
        type: DataTypes.INTEGER,
    },
    trang_thai:{
        type: DataTypes.INTEGER,
    }
}, { tableName: 'phieu_xuat', timestamps: false });

// Thiết lập quan hệ
Invoice.belongsTo(Customer, { foreignKey: 'ma_kh', onDelete: 'CASCADE' });
Invoice.belongsTo(Employee, { foreignKey: 'ma_nv', onDelete: 'CASCADE' });
module.exports = Invoice;
