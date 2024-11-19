const db = require("../config/db");
const { DataTypes } = require("sequelize");

// Định nghĩa ProductModel
const ProductModel = db.define(
  "ProductModel",
  {
    ma_sp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ten_sp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hinh_anh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chip_xu_ly: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dung_luong_pin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    kich_thuoc_man: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    camera_truoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    camera_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hdh: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "he_dieu_hanh",
        key: "ma_hdh",
      },
    },
    thuong_hieu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "thuong_hieu",
        key: "ma_thuong_hieu",
      },
    },
    xuat_xu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "xuat_xu",
        key: "ma_xuat_xu",
      },
    },
    khu_vuc_kho: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "khu_vuc_kho",
        key: "ma_kho",
      },
    },
    so_luong_ton: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mo_ta_sp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "san_pham",
    timestamps: false,
  }
);

module.exports = ProductModel;
