const asyncHandler = require("../middleware/asyncHandler");
const Order = require("../models/orderModel");
const Orderr = require("../models/Order");


const addOrderItems = asyncHandler(async (req, res) => {
    const newOrder = new Orderr(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})
// const {
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
// } = req.body

// if (orderItems && orderItems.length === 0) {
//     res.status(400)
//     throw new Error('No order items')
// } else {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
// }

const getOrders = asyncHandler(async (req, res) => {
    res.send('getOrders')
    // const orders = await Order.find({}).populate('user', 'id name');
    // res.json(orders);
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = Order.find({ user: req.user._id });
    res.json(orders);
})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );
    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error('Order not found')
    }
})


module.exports = { addOrderItems, getMyOrders, getOrderById, getOrders };