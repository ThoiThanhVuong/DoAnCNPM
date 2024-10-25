const db = require('../config/db');
const { DataTypes } = require('sequelize');

const ProductModel = db.define('ProductModel',{
    ma_sp:{
        type: DataTypes.INTEGER,
       allowNull:false,
       primaryKey: true
    },
    ten_sp:{
        type: DataTypes.STRING,
        allowNull: false
    },
   hinh_anh:{
    type: DataTypes.STRING,
    allowNull: false
   }
    
},{
    tableName:'san_pham',
    timestamps:false
}
);
// Thiết lập mối quan hệ giữa các table nếu có
//Product.belongsTo(Category, { foreignKey: 'categoryId' });
//Category.hasMany(Product, { foreignKey: 'categoryId' });
module.exports = ProductModel;

