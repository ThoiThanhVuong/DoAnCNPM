const express = require('express');
const app = express();
const productRoutes = require('../routes/productRoutes.js');

// Middleware để parse JSON
app.use(express.json());

// Định nghĩa các route
app.use('/api/products', productRoutes);


module.exports = app;
