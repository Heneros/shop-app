const express = require("express");


const { addOrderItems, getMyOrders, getOrders, getOrderById } = require("../controllers/ordersController");
const { protect, admin } = require("../middleware/authMiddleware");
const { verifyToken } = require("../utils/verifyToken");
const Orderr = require("../models/Order");
const router = express.Router();

//  router.post("/", verifyToken, addOrderItems);
// router.route('/').post(  addOrderItems).get(getOrders);

// const bodyParser = require("body-parser");

// router.use(bodyParser.json());


router.post("/", async (req, res) => {
    const newOrder = new Orderr(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.route('/mine').get(getMyOrders);
router.route('/:id').get(getOrderById);


module.exports = router;