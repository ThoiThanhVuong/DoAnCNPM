const express = require('express');
const router = express.Router();
const thongkeController = require('../controllers/thongkeController');
router.get('/thongKeKhachHang',thongkeController.getThongKeKhachHang);
router.get('/thongKeNhaCungCap',thongkeController.getThongKeProvider);
module.exports = router;