const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Provider = sequelize.define('Provider', {
    ma_ncc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ten_ncc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dia_chi: {
        type: DataTypes.STRING,
    },
    email_ncc: {
        type: DataTypes.STRING,
    },
    sdt_ncc: {
        type: DataTypes.STRING,
    },
}, { tableName: 'nha_cung_cap', timestamps: false, });
module.exports = Provider;