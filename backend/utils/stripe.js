const stripe = require("stripe")(process.env.STRIPE_SECRET);
const express = require("express");
const Order = require("../models/orderModel");
const bodyParser = require("body-parser");

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const userId = req.body.userId;

    const cartItems = req.body.cartItems;

    // console.log(cartItems);
    if (!Array.isArray(cartItems)) {
      return res.status(400).send("Invalid cartItems format");
    }

    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        cart: JSON.stringify(req.body.cartItems),
      },
    });

    //
    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.imageUrl],
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.qty,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.CLIENT_ORIGIN}/checkout-success`,
      cancel_url: `${process.env.CLIENT_ORIGIN}/placeorder`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
