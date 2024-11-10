const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const CustomerModel = require('../models/CustomerModel');
const Employee =require('../models/EmployeeModel');


const PhieuXuatModel = sequelize.define('PhieuXuatModel', {
    ma_px: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ma_kh: {
        type: DataTypes.INTEGER,
        references: {
            model: CustomerModel,
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
PhieuXuatModel.belongsTo(Employee, {foreignKey: 'ma_nv', onDelete: 'CASCADE'});
module.exports = PhieuXuatModel;
