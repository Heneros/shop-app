const asyncWrapper = require('../middleware/async');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
    res.send('auth user')

});


const registerUser = asyncWrapper(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

module.exports = { getAllUsers, registerUser, authUser };