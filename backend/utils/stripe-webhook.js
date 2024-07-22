const stripeWebhook = async (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  const endpointSecret = process.env.STRIPE_WEB_HOOK;

  // authenticateToken();

  const userId = req.user;
  // console.log("userId", userId);

  let event;

  const stripe = require("stripe")(process.env.STRIPE_SECRET);

  const currentUser = req.user;
  if (currentUser) {
    console.log("Current user", currentUser);
  } else {
    console.log("User not authenticated", currentUser);
    return;
  }

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (error) {
    console.log("Error", error.message);
    res.status(400).json({ success: false });
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      let data = event.data.object;
      let customer_detail = event.data.object.customer_details;

      break;
    case "payment_intent.payment_failed":
      const paymentFailedIntent = event.data.object;
      console.log("payment_intent.failed");
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).end();
};

module.exports = stripeWebhook;
