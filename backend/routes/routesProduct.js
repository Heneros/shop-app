const express = require('express');
const { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct, getLastFilters } = require('../controllers/products');

const router = express.Router();

router.route('/filters').get(getLastFilters);
router.route('/').get(getAllProducts).post(createProduct)
router.route("/:id").get(getProduct).delete(deleteProduct).patch(updateProduct);


module.exports = router;