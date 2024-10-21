const express = require('express');
const cors = require('cors');
const app = express();
const productRoutes = require('../backend/src/routes/productRoutes.js');
app.use(cors());
// Middleware để parse JSON
app.use(express.json());

// Định nghĩa các route
app.use('/api/products', productRoutes);


module.exports = app;
