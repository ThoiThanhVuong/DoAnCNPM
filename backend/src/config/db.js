const { Sequelize } = require('sequelize');

// Kết nối MySQL với Sequelize
const sequelize = new Sequelize('quanlidienthoai', 'root', '', {
    host: 'localhost',

    dialect: 'mysql'
});




module.exports = sequelize;