require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const stripe = require("./utils/stripe");

// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { v4: uuidv4 } = require("uuid");

const connectDB = require("./db/db");
const productRouter = require("./routes/routesProduct");
const routesUser = require("./routes/routesUser");
const routesOrder = require("./routes/routesOrder");
const routeUpload = require("./routes/routeUpload");
const Token = require("./models/tokenModel.js");
const User = require("./models/userModel.js");

const Order = require("./models/orderModel.js");

require("./utils/oauth.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:7200",
    credentials: true,
  })
);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Working on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();

const createOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);

  console.log(items);
};

app.use(
  "/api/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEB_HOOK;

    let event;
    const stripe = require("stripe")(process.env.STRIPE_SECRET);

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("Error", error.message);
      res.status(400).json({ success: false });
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        // const orderId = paymentIntent.metadata.orderId;
        createOrder();
        const paymentIntent = event.data;
        const clientReferenceId = paymentIntent;
        console.log("data", paymentIntent);

        const orderId = paymentIntent.metadata.id;

        const order = await Order.findOne({ _id: orderId });

        if (order) {
          order.isPaid = true;
          order.paidAt = new Date();
          order.paymentResult = {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: paymentIntent.created,
            email_address: null,
          };
          const updatedOrder = await order.save();
          res.json(updatedOrder);
        } else {
          console.log("order not found");
        }
        break;
      case "payment_intent.payment_failed":
        const paymentFailedIntent = event.data.object;
        console.log("payment_intent.failed");
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    console.log("Event");
    res.status(200).end();
    // console.log("payload", endpointSecret);
  }
);

app.use(express.json());

app.use("/api/stripe", stripe);

app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: "123Secret123", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// app.use((req, res, next) => {

app.use("/api/products", productRouter);
app.use("/api/users", routesUser);
app.use("/api/orders", routesOrder);
app.use("/api/upload", routeUpload);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:7200/profile",
    failureRedirect: "/auth/google/failure",
  })
);
app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

// app.post("/api/stripe/pay", (req, res, next) => {
//   console.log(req.body.token);
//   const { token, amount } = req.body;
//   const idempotencyKey = uuidv4();

//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token,
//     })
//     .then((customer) => {
//       stripe.charges.create(
//         {
//           amount: amount * 100,
//           currency: "usd",
//           customer: customer.id,
//           receipt_email: token.email,
//         },
//         { idempotencyKey }
//       );
//     })
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/verify-email/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const tokenDoc = await Token.findOne({ token });

    if (!tokenDoc) {
      return res.status(400).send("Invalid or expired token");
    }
    const user = await User.findById(tokenDoc._userId);
    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.isVerified) {
      return res.status(400).send("User already verified.");
    }
    user.isVerified = true;
    await user.save();
    setTimeout(() => {
      res.redirect("http://localhost:7200");
    }, 2500);
  } catch (error) {
    console.log(error);
  }
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
