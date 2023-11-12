const express = require("express");


const { addOrderItems, getMyOrders, getOrders, getOrderById } = require("../controllers/ordersController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.route('/').post(protect, addOrderItems).get(protect, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

module.exports = router;