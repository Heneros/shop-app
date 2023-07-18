const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/products');

const router = express.Router();


router.route('/').get(getAllProducts).post(createProduct)

module.exports = router;