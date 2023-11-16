const express = require("express");


const { addOrderItems, getMyOrders, getOrders, getOrderById } = require("../controllers/ordersController");
const { protect, admin } = require("../middleware/authMiddleware");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.route('/').post( addOrderItems).get(getOrders);
router.route('/mine').get(getMyOrders);
router.route('/:id').get(getOrderById);


module.exports = router;