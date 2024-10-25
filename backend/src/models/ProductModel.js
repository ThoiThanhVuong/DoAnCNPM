const db = require('../config/db');
const { DataTypes } = require('sequelize');

const ProductModel = db.define('ProductModel',{
    masp:{
        type: DataTypes.INTEGER,
       allowNull:false,
       primaryKey: true
    },
    tensp:{
        type: DataTypes.STRING,
        allowNull: false
    },
   hinhanh:{
    type: DataTypes.STRING,
    allowNull: false
   }
    
},{
    tableName:'sanpham',
    timestamps:false
}
);
// Thiết lập mối quan hệ giữa các table nếu có
//Product.belongsTo(Category, { foreignKey: 'categoryId' });
//Category.hasMany(Product, { foreignKey: 'categoryId' });
module.exports = ProductModel;

