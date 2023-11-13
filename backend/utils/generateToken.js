const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, 'keyuniq', {
        expiresIn: '30d',
    });


    res.cookie('jwtt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    return true;
};

module.exports = generateToken;
