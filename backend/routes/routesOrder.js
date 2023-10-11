const express = require("express");


const { addOrderItems, getMyOrders, getOrderById } = require("../controllers/ordersController");
const router = express.Router();


router.route('/').post(addOrderItems).get(getMyOrders);
router.route('/:id').get(getOrderById);

module.exports = router;