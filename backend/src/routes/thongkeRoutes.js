const express = require('express');
const router = express.Router();
const thongkeController = require('../controllers/thongkeController');
router.get('/thongKeKhachHang',thongkeController.getThongKeKhachHang);
module.exports = router;