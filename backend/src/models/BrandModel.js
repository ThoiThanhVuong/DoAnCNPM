// models/BrandModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Brand = sequelize.define(
  "Brand",
  {
    mathuonghieu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenthuonghieu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "thuonghieu1",
    timestamps: false,
  }
);

module.exports = Brand;
