const { Sequelize } = require('sequelize');

// Kết nối MySQL với Sequelize
const sequelize = new Sequelize('quanlidienthoai', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;