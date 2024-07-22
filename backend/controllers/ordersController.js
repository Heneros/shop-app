const asyncHandler = require("../middleware/asyncHandler");
const Order = require("../models/Order");
const Product = require("../models/product");
// const Order = require("../models/Order");
const { calcPrice } = require("../utils/calcPrice.js");
const {
  verifyPayPalPayment,
  checkIfNewTransaction,
} = require("../utils/paypal.js");
// import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

const addOrderItems = asyncHandler(async (req, res) => {
  // const newOrder = new Order(req.body);

  // try {
  //     const savedOrder = await newOrder.save();
  //     res.status(200).json(savedOrder);
  // } catch (err) {

  //     res.status(500).json(err);
  // }

  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });
    // console.log(itemsFromDB)

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrice(dbOrderItems);
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
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
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
    // console.log(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// const updateOrderToPaid = asyncHandler(async (req, res) => {
//     const { verified, value } = await verifyPayPalPayment(req.body.id);
//     if (!verified) throw new Error('Payment not verified');

//     const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
//     if (!isNewTransaction) throw new Error('Transaction has been used before');

//     const order = await Order.findById(req.params.id);

//     if (order) {
//         const paidCorrectAmount = order.totalPrice.toString() === value;
//         if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

// order.isPaid = true;
// order.paidAt = Date.now();
// order.paymentResult = {
//     id: req.body.id,
//     status: req.body.status,
//     update_time: req.body.update_time,
//     email_address: req.body.payer.email_address,
// };

// const updatedOrder = await order.save();

// res.json(updatedOrder);
//     } else {
//         res.status(404);
//         throw new Error('Order not found');
//     }
// });

const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    // if (!order) {
    //     throw new Error('Order not found');
    // }

    // const paymentDetails = req.body;

    // if (!paymentDetails.payer) {
    //     throw new Error('Invalid payment details: missing payer object');
    // }
    // if (!paymentDetails.payer.email_address) {
    //     throw new Error('Invalid payment details: missing payer email address');
    // }
    // if (!paymentDetails.update_time) {
    //     throw new Error('Invalid payment details: missing payment update time');
    // }
    // if (!paymentDetails.id) {
    //     throw new Error('Invalid payment details: missing payment method ID');
    // }

    // if (!paymentDetails.status) {
    //     throw new Error('Invalid payment details: missing payment status');
    // }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
