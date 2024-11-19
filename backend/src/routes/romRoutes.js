const express = require("express");
const romController = require("../controllers/romController");

const router = express.Router();

router.get("/", romController.getAllRoms);
router.post("/", romController.addRom);
router.put("/:id", romController.updateRom);
router.delete("/:id", romController.deleteRom);

module.exports = router;
