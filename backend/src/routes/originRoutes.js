const express = require("express");
const originController = require("../controllers/originController");

const router = express.Router();

// Định nghĩa các route cho API
router.get("/", originController.getAllOrigins); // Lấy tất cả xuất xứ
router.post("/", originController.addOrigin); // Thêm xuất xứ mới
router.put("/:id", originController.updateOrigin); // Cập nhật xuất xứ
router.delete("/:id", originController.deleteOrigin); // Xóa xuất xứ

module.exports = router;
