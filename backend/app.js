const express = require('express');
const cors = require('cors');
const sequelize = require('../backend/src/config/db.js');
const productRoutes = require('../backend/src/routes/productRoutes.js');
const permissionRoutes = require('../backend/src/routes/permissionRouter.js')
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
// Middleware để parse JSON
app.use(bodyParser.json());

// Định nghĩa các route cho sản phẩm
app.use('/api/products', productRoutes);
app.use('/api/permission', permissionRoutes);

// Đồng bộ database với Sequelize
sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.log('Error syncing database:', err);
    }); 
    
module.exports = app;
