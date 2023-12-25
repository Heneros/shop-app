const asyncHandler = require("../middleware/asyncHandler");
const Order = require("../models/orderModel");
// const Order = require("../models/Order");


const addOrderItems = asyncHandler(async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})


const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
    // try {
    //   ;
    // } catch (error) {
    //     res.json(error);
    //     throw new Error('Error getMyOrders')
    // }
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