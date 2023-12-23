const jwt = require('jsonwebtoken');

const asyncHandler = require('./asyncHandler.js');
const User = require('../models/userModel.js');




const auth = asyncHandler(async (req, res, next) => {
    // let token = req.header("x-auth-token");
    let token;
    token = req.cookies.jwt;
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, No token");
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id, "-password");
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Not authorized, Invalid token");
    }
});



const protect = asyncHandler(async (req, res, next) => {

    let token;
    // token = res.cookies.jwt;
    token = req.cookies.jwt;

    console.log(token)
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
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
