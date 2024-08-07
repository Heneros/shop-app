const express = require("express");


const { addOrderItems, getMyOrders, getOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } = require("../controllers/ordersController");
const { protect, admin, auth } = require("../middleware/authMiddleware");
// const { verifyToken } = require("../utils/verifyToken");
// const Orderr = require("../models/Order");
const router = express.Router();

// router.post("/", , addOrderItems).get(protect, admin, getOrders);
router.route("/").post(protect, addOrderItems).get(protect, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);


module.exports = router;