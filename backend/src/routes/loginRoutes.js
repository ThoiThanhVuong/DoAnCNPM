const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/getFeatureFromToken", loginController.getFeatureFromToken);
router.post("/", loginController.compareAccount);
router.post("/checkUsername", loginController.checkUsername);

module.exports = router;