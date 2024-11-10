const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");

router.get("/show", permissionController.showAllPermission);

module.exports = router;
