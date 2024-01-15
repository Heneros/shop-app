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

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });



    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        let transporter = null;
        if (process.env.NODE_ENV === 'production') {
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_NAME,
                    pass: process.env.SMTP_PASS,
                },
                debug: true,
            });
        } else {
            transporter = nodemailer.createTransport({
                // host: process.env.SMTP_HOST,
                host: "localhost",
                port: 1025,
                secure: false,
                auth: {
                    user: process.env.SMTP_NAME,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false
                },
                debug: true,
            });
        }


        const mailOptions = {
            from: process.env.SMTP_NAME,
            to: email,
            subject: 'Authorize success',
            text: `Hello, you been authorize in site <a href='mailto:${email}'> {email}</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(res, user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Credentials");
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

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);


        // //send email
        let transporter = null;
        if (process.env.NODE_ENV === 'production') {
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_NAME,
                    pass: process.env.SMTP_PASS,
                },
                debug: true,
            });
        } else {
            transporter = nodemailer.createTransport({
                // host: process.env.SMTP_HOST,
                host: "localhost",
                port: 1025,
                secure: false,
                auth: {
                    user: process.env.SMTP_NAME,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false
                },
                debug: true,
            });
        }

        // function generateToken(length) {
        //     return crypto.randomBytes(length).toString('hex');
        // }
        function generateToken(length) {
            const tokenLength = typeof length === 'number' ? length : 16;

            return crypto.randomBytes(tokenLength).toString('hex');
        }

        // Usage
        const generateTokenString = generateToken(20);

        // const generateTokenString = generateToken(30);

        const token = new Token({ _userId: user._id, token: generateTokenString });
        await token.save();

        const urlBase = process.env.APP_BASE_URL;

        const mailOptions = {
            from: process.env.SMTP_NAME,
            to: email,
            subject: 'Sign Up success',
            text: `Hello, ${user.name}! Thank you for signing up. Please click the following link to verify your email: ${urlBase}/verify-email/${token.token}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });



        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(req.params.id);
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