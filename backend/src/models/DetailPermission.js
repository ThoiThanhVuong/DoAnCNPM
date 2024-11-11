const db = require("../config/db");
const { DataTypes } = require("sequelize");
const FeaturePermissionModel =require('./FeaturePermissionModel');
const PermissionModel = require('./permissionModel');
const DetailPermission = db.define(
    "DetailPermission",
    {
      ma_quyen: {
        type: DataTypes.INTEGER,
        references: {
          model: PermissionModel,
          key: "ma_quyen",
        },
      },
      ma_chuc_nang: {
        type: DataTypes.INTEGER,
        references: {
          model: FeaturePermissionModel,
          key: "ma_chuc_nang",
        },
      },
      hanh_dong: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "chi_tiet_quyen",
      timestamps: false,
    }
  );
  module.exports= DetailPermission;