// routes/brandRoutes.js
const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.get('/', brandController.getAllBrands);
router.post('/', brandController.addBrand);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
