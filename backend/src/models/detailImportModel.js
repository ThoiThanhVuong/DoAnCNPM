const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Import = require('./ImportModel')
const Product = require('./ProductModel')
const detailImport = sequelize.define('DetailImport', {
    ma_pn: {
        type: DataTypes.INTEGER,
        references:{
            model : Import,
            key: 'ma_pn',
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
    gia_nhap: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'chi_tiet_phieu_nhap',
    timestamps: false,
}) 
detailImport.belongsTo(Import, {foreignKey: 'ma_pn', onDelete: 'CASCADE'});
detailImport.belongsTo(Product, {foreignKey: 'ma_sp', onDelete: 'CASCADE'});
// chưa có kho
module.exports = detailImport;