const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Set JWT as an HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        domain: 'http://localhost:7200',
        // secure: process.env.NODE_ENV !== 'development', 
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000, 
    });
};
module.exports = generateToken;

