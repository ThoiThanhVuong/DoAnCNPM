const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

// Định nghĩa route API cho sản phẩm
router.get('/', permissionController.getAllPermissions);

module.exports = router;