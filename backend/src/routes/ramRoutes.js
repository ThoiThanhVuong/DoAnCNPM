const express = require("express");
const ramController = require("../controllers/ramController");

const router = express.Router();

router.get("/", ramController.getAllRams);
router.post("/", ramController.addRam);
router.put("/:id", ramController.updateRam);
router.delete("/:id", ramController.deleteRam);

module.exports = router;
