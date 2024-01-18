const asyncWrapper = require('../middleware/async');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const nodemailer = require('nodemailer');
const Token = require('../models/tokenModel');
const crypto = require("crypto");

const {sendEmailAuth , sendEmailRegister} = require('../utils/email');

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password) )) {
      if(user.isVerified === true){
          generateToken(res, user._id);
          
        sendEmailAuth(req, res); 
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(res, user._id),
            isVerified: user.isVerified
        });
      } else {
          res.status(401).json({message: "User is not verified"});
        //   throw new Error("User is not verified")
    }
    } else {
        res.status(401).json({message: "Invalid Credentials"});
        // throw new Error("Invalid Credentials");
        }
            
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logout success' })
});

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        res.status(400).json({ message: 'Empty fields' })
        return 
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({message:'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {

        generateToken(res, user._id);

        sendEmailRegister(res, user);

         //send email
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified
        });
    } else {
        res.status(400).json({message:'Invalid user data' });
        }
    
});


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    // console.log(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Can not delete admin user');
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }

})


module.exports = { getAllUsers, registerUser, authUser, logoutUser, updateUser, deleteUser, getUserProfile, getUserById, updateUserProfile };