const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const PhieuXuatModel = require('../models/phieuXuatModel');
// const SanPhamModel = require('./ProductModel');
// const WareHouse = require('../models/WareHouseModel');

const models = require('../models/Relationship')

const detailExport = sequelize.define('detailExport', {
    ma_px: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model : models.PhieuXuat,
            key: 'ma_px',
        }
    },
    ma_phien_ban_sp: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model :models.PhienBanSPModel,
            key: 'ma_phien_ban_sp',
        }
    },
    so_luong: {
        type: DataTypes.INTEGER,
    },
//    ma_kho: {
//         type: DataTypes.INTEGER,
//         references:{
//             model: WareHouse,
//             key: 'ma_kho',
//         }
//     },
    gia_xuat: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'chi_tiet_phieu_xuat',
    timestamps: false,
}) 
module.exports = detailExport;