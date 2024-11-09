const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Import = require('../models/ImportModel')
const ProductModel = require('../models/ProductModel')
const WareHouse = require('../models/WareHouseModel')

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
            model : ProductModel,
            key: 'ma_sp',
        }
    },
    so_luong: {
        type: DataTypes.INTEGER,
    },
    ma_kho: {
        type: DataTypes.INTEGER,
        references:{
            model: WareHouse,
            key: 'ma_kho',
        }
    },
    gia_nhap: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'chi_tiet_phieu_nhap',
    timestamps: false,
}) 
detailImport.belongsTo(Import, {foreignKey: 'ma_pn', onDelete: 'CASCADE'});
detailImport.belongsTo(ProductModel, {foreignKey: 'ma_sp', onDelete: 'CASCADE'});
detailImport.belongsTo(WareHouse, {foreignKey: 'ma_kho', onDelete: 'CASCADE'});
module.exports = detailImport;