const express = require("express");
const colorController = require("../controllers/colorController");

const router = express.Router();

router.get("/", colorController.getAllColors);
router.post("/", colorController.addColor);
router.put("/:id", colorController.updateColor);
router.delete("/:id", colorController.deleteColor);

module.exports = router;
