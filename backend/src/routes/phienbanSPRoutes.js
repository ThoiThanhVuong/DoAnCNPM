const express = require("express");
const pbspController = require('../controllers/phienbanSPController')

const router = express.Router();

router.get("/", pbspController.getAllPBSP)

module.exports = router