const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PhieuXuatModel = require('../models/phieuXuatModel')
const phienBanSanPham = require('./PhienBanSPModel')
const WareHouse = require('../models/WareHouseModel');

const detailExport = sequelize.define('detailExport', {
    ma_px: {
        type: DataTypes.INTEGER,
        references:{
            model : PhieuXuatModel,
            key: 'ma_px',
        }
    },
    ma_phien_ban_sp: {
        type: DataTypes.INTEGER,
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
    gia_xuat: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'chi_tiet_hoa_don',
    timestamps: false,
}) 
module.exports = detailExport;