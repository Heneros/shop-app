const express = require('express');
const { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct, getLastFilters } = require('../controllers/products');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// router.route('/filters').get(getLastFilters);

router.route('/').get(getAllProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProduct).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);
// router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;