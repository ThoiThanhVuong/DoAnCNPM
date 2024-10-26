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

const FunctionPermission = db.define('FunctionPermission', {
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
    hanh_dong: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'chi_tiet_quyen',
    timestamps: false
});

PermissionModel.hasMany(DetailPermission, {
    foreignKey: 'ma_quyen'
});

FunctionPermission.hasMany(DetailPermission, {
    foreignKey: 'ma_chuc_nang'
});

DetailPermission.belongsTo(PermissionModel, {
    foreignKey: 'ma_quyen'
});

DetailPermission.belongsTo(FunctionPermission, {
    foreignKey: 'ma_chuc_nang'
});

module.exports = {PermissionModel, FunctionPermission, DetailPermission}