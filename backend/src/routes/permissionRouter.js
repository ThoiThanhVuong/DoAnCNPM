const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

// Định nghĩa route API cho sản phẩm
router.get('/', permissionController.getAllPermissions);
router.get('/function_permission/:ma_quyen', permissionController.getAllFunctionPermission);
router.post('/create', permissionController.createPermission);
// router.put('/edit/:ma_quyen', permissionController.editPermission);
router.delete('/delete/:ma_quyen', permissionController.deletePermission);

module.exports = router;