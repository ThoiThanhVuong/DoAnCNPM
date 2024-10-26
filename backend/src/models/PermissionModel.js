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
    ma_quyen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PermissionModel,
            key: 'ma_quyen'
        }
    },
    ma_chuc_nang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FunctionPermission,
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

PermissionModel.hasMany(DetailPermission, {
    foreignKey: 'ma_quyen',
    sourceKey: 'ma_quyen',
    as: 'chiTietQuyen' // Alias cho quan hệ này
});

FunctionPermission.hasMany(DetailPermission, {
    foreignKey: 'ma_chuc_nang',
    sourceKey: 'ma_chuc_nang',
    as: 'chiTietQuyen' // Alias cho quan hệ này
});

DetailPermission.belongsTo(PermissionModel, {
    foreignKey: 'ma_quyen',
    targetKey: 'ma_quyen',
    as: 'nhomQuyen' // Alias cho quan hệ này
});

DetailPermission.belongsTo(FunctionPermission, {
    foreignKey: 'ma_chuc_nang',
    targetKey: 'ma_chuc_nang',
    as: 'chucNang' // Alias cho quan hệ này
});

module.exports = {PermissionModel, FunctionPermission, DetailPermission}