const asyncWrapper = require('../middleware/async');
const User = require('../models/userModel');

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

module.exports = { getAllUsers };