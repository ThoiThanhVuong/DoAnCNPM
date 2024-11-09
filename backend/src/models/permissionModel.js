const db = require("../config/db");
const { DataTypes } = require("sequelize");

const Permission = db.define(
  "Permission",
  {
    ma_quyen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ten_quyen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "nhom_quyen",
    timestamps: false,
  }
);

const FeaturePermission = db.define(
  "FeaturePermission",
  {
    ma_chuc_nang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ten_chuc_nang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "chuc_nang",
    timestamps: false,
  }
);

const DetailPermission = db.define(
  "DetailPermission",
  {
    ma_quyen: {
      type: DataTypes.INTEGER,
      references: {
        model: Permission,
        key: "ma_quyen",
      },
    },
    ma_chuc_nang: {
      type: DataTypes.INTEGER,
      references: {
        model: FeaturePermission,
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

Permission.belongsToMany(FeaturePermission, {
  through: DetailPermission,
  foreignKey: "ma_quyen",
});
FeaturePermission.belongsToMany(Permission, {
  through: DetailPermission,
  foreignKey: "ma_chuc_nang",
});

const Employees = db.define(
  "Employees",
  {
    ma_nv: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ten_nv: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    mat_khau: {
      type: DataTypes.STRING,
    },
    ma_quyen: {
      type: DataTypes.INTEGER,
      references: {
        model: Permission,
        key: "ma_quyen",
      },
    },
  },
  {
    tableName: "nhan_vien",
    timestamps: false,
  }
);

Permission.hasMany(Employees, { foreignKey: "ma_quyen" });
Employees.belongsTo(Permission, { foreignKey: "ma_quyen" });

module.exports = {
  Permission,
  FeaturePermission,
  DetailPermission,
  Employees,
};
