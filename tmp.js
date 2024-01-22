

router.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
      try {
  
        const sig = req.headers["stripe-signature"];
        const endpointSecret = process.env.STRIPE_WEB_HOOK;
  
        const event = stripe.webhooks.constructEvent(
          req.rawBody,
          sig,
          endpointSecret
        );
  
        console.log("Received payload:", req.rawBody.toString());
        console.log("Event webhook", event);
  
        if (event.type === "payment_intent.succeeded") {
          const paymentIntent = event.data.object;
          const orderId = paymentIntent.metadata.orderId;
  
          const order = Order.findById(orderId);
  
          if (order) {
            order.isPaid = true;
            order.paidAt = new Date();
            await order.save();
          }
        } else {
          console.log("Not found webhook");
        }
  
        res.json({ received: true });
      } catch (err) {
        console.error("Error handling webhook:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }
  );