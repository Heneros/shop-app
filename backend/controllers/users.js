const asyncWrapper = require('../middleware/async');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const authUser = asyncHandler(async (req, res, userId) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        // const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        //     expiresIn: '30d',
        // });


        // res.cookie('jwt', token, {
        //     crossDomain: true,
        //     xhrFields: { withCredentials: true }
        //     // httpOnly: true,
        //     // secure: process.env.NODE_ENV !== 'development',
        //     // sameSite: 'None',
        //     // maxAge: 30 * 24 * 60 * 60 * 1000,
        // });
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })


        // const token = jwt.sign(
        //     {
        //         _id: user._id,
        //     },
        //     process.env.JWT_SECRET,
        //     {
        //         expiresIn: '30d'
        //     },
        // );
        // const { passwordHash, ...userData } = user._doc;

        // res.json({
        //     ...userData,
        //     token
        // })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
    // res.send('auth user')

});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logout success' })
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    // const doc = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // });

    // const user = await doc.save();

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});



module.exports = { getAllUsers, registerUser, authUser, logoutUser };