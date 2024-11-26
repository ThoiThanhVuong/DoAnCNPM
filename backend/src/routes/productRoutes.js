const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Định nghĩa route API cho sản phẩm
router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);
router.get("/countProduct", productController.getCountProduct);
router.patch("/:ma_sp", productController.updatedCountProduct);
module.exports = router;
