const jwt = require('jsonwebtoken');

const asyncHandler = require('./asyncHandler.js');
const User = require('../models/userModel.js');
const Order = require('../models/orderModel.js');




const auth = asyncHandler(async (req, res, next) => {
    // let token = req.header("x-auth-token");
    let token;
    token = req.cookies.jwt;
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, No token 123");
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id, "-password");
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Not authorized, Invalid token 1234");
    }
});



const protect = asyncHandler(async (req, res, next) => {
    let token;


    token = req.cookies.jwt;

    if (token) {
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');

            const order = await Order.findById(req.params.id);
      
            // console.log(decoded.userId);
            // console.log('Decoded'.decoded.userId);
            // if (order.user = decoded.userId) {

            req.user = await User.findById(decoded.userId).select('-password');
            next();
            // if (order && order.user.toString() === decoded.userId) {


            // } else {
            //     res.status(403);
            //     throw new Error('Forbidden');
            // }
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin, auth }
