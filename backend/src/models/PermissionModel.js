const db = require('../config/db');
const { DataTypes } = require('sequelize');

const PermissionModel = db.define('PermissionModel',{
    ma_quyen:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true
    },
    ten_quyen:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
   tableName: 'nhom_quyen',
   timestamps:false
})

const FeaturePermission = db.define('FeaturePermission', {
    ma_chuc_nang:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    ten_chuc_nang:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'chuc_nang',
    timestamps:false
})

const DetailPermission = db.define('DetailPermission', {
    ma_quyen: {
        type: DataTypes.INTEGER,
        references:{
            model: PermissionModel,
            key: 'ma_quyen'
        }
    },
    ma_chuc_nang: {
        type: DataTypes.INTEGER,
        references:{
            model: FeaturePermission,
            key: 'ma_chuc_nang'
        }
    },
    hanh_dong: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'chi_tiet_quyen',
    timestamps: false
});

PermissionModel.belongsToMany(FeaturePermission, {through: DetailPermission, foreignKey: 'ma_quyen'})
FeaturePermission.belongsToMany(PermissionModel, {through: DetailPermission, foreignKey: 'ma_chuc_nang'})

module.exports = {PermissionModel, FeaturePermission, DetailPermission}