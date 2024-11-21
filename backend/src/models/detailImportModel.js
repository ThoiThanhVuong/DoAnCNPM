const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Import = require('../models/ImportModel')
const phienBanSanPham = require('./PhienBanSPModel')
const WareHouse = require('../models/WareHouseModel')

const detailImport = sequelize.define('DetailImport', {
    ma_pn: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model : Import,
            key: 'ma_pn',
        }
    },
    ma_phien_ban_sp: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model : phienBanSanPham,
            key: 'ma_phien_ban_sp',
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
detailImport.belongsTo(WareHouse, {foreignKey: 'ma_kho', onDelete: 'CASCADE'});
module.exports = detailImport;