const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Invoice = require('../models/phieuXuatModel')
const Product = require('../models/ProductModel')
const detailExport = sequelize.define('detailExport', {
    ma_hd: {
        type: DataTypes.INTEGER,
        references:{
            model : Invoice,
            key: 'ma_hd',
        }
    },
    ma_sp: {
        type: DataTypes.INTEGER,
        references:{
            model : Product,
            key: 'ma_sp',
        }
    },
    so_luong: {
        type: DataTypes.INTEGER,
    },
    ma_kho: {
        type: DataTypes.INTEGER,
        // chưa có model kho
    },
    gia_xuat: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'chi_tiet_hoa_don',
    timestamps: false,
}) 
detailExport.belongsTo(Invoice, {foreignKey: 'ma_hd', onDelete: 'CASCADE'});
detailExport.belongsTo(Product, {foreignKey: 'ma_sp', onDelete: 'CASCADE'});