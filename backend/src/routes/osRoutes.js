const express = require("express");
const osController = require("../controllers/osController");

const router = express.Router();

router.get("/", osController.getAllOperatingSystems);
router.post("/", osController.addOperatingSystem);
router.put("/:id", osController.updateOperatingSystem);
router.delete("/:id", osController.deleteOperatingSystem);

module.exports = router;
