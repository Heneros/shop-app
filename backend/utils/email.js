const nodemailer = require('nodemailer');
const crypto = require("crypto");


const asyncHandler = require('../middleware/asyncHandler');
const Token = require('../models/tokenModel');


const sendEmailAuth = asyncHandler(async(req, res) => {
let transporter = null;
if (process.env.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false, ///change 
        auth: {
            user: process.env.SMTP_NAME,
            pass: process.env.SMTP_PASS,
        },
        debug: true,
    });
} else {
    transporter = nodemailer.createTransport({
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
    to: req.body.email,
    subject: 'Authorize success',
    text: `Hello, you been authorize in site ${req.body.email}`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

});



const sendEmailRegister = asyncHandler(async (req, user) => {
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
        function generateToken(length) {
            const tokenLength = typeof length === 'number' ? length : 16;
            return crypto.randomBytes(tokenLength).toString('hex');
        }

        const generateTokenString = generateToken(20);



        const token = await new Token({ _userId: user._id, token: generateTokenString });
    await token.save();
    console.log( token);

        const urlBase = process.env.APP_BASE_URL;

        const mailOptions = {
            from: process.env.SMTP_NAME,
            to: user.email,
            subject: 'Sign Up success',
            text: `Hello, ${user.name}! Thank you for signing up. Please click the following link to verify your email: ${urlBase}/verify-email/${token?.token}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
})

module.exports = {sendEmailAuth, sendEmailRegister};