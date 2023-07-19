const express = require('express');
const { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct } = require('../controllers/products');

const router = express.Router();


router.route('/').get(getAllProducts).post(createProduct)
router.route("/:id").get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;