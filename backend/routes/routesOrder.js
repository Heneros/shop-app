const express = require("express");

const router = express.Router();
const { addOrderItems } = require("../controllers/ordersController");

router.route('/').post(addOrderItems);

module.exports = router;