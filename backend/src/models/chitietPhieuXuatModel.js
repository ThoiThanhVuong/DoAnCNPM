const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PhieuXuatModel = require('../models/phieuXuatModel')
const ProductModel = require('../models/ProductModel')
const WareHouse = require('../models/WareHouseModel');

const detailExport = sequelize.define('detailExport', {
    ma_px: {
        type: DataTypes.INTEGER,
        references:{
            model : PhieuXuatModel,
            key: 'ma_px',
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
    gia_xuat: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'chi_tiet_hoa_don',
    timestamps: false,
}) 
detailExport.belongsTo(PhieuXuatModel, {foreignKey: 'ma_px', onDelete: 'CASCADE'});
detailExport.belongsTo(ProductModel, {foreignKey: 'ma_sp', onDelete: 'CASCADE'});
detailExport.belongsTo(WareHouse, {foreignKey: 'ma_kho', onDelete: 'CASCADE'});
module.exports = detailExport;