const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");

router.get("/show", permissionController.showAllPermission);
router.put("/update_role/:ma_nv", permissionController.updateRole)
router.put("/delete_role/:ma_nv", permissionController.deleteRole)

module.exports = router;
