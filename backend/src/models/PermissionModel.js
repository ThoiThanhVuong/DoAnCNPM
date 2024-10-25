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

module.exports = PermissionModel