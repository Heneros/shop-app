require("dotenv").config();

const express = require("express");
const session = require("express-session");
// const passport = require("passport");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const stripe = require("./utils/stripe");

const connectDB = require("./db/db");
const productRouter = require("./routes/routesProduct");
const routesUser = require("./routes/routesUser");
const routesOrder = require("./routes/routesOrder");
const routeUpload = require("./routes/routeUpload");

// const stripeWebhook = require("./utils/stripe-webhook.js");
const { verifyEmail } = require("./utils/email.js");

// require("./utils/oauth.js");

const app = express();

// app.enable("trust proxy");
// app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://localhost:7300",
    // origin: true,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", 'PATCH'],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
    // exposedHeaders: ["set-cookie"],
  })
);

// app.use(
//   "/api/stripe/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   stripeWebhook
// );

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.PASSPORT_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {

app.use("/api/products", productRouter);
app.use("/api/users", routesUser);
app.use("/api/orders", routesOrder);
app.use("/api/upload", routeUpload);
// app.use("/api/stripe", stripe);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "https://react-shop-app-frontend.onrender.com/profile",
//     failureRedirect: "/auth/google/failure",
//   })
// );
// app.get("/auth/google/failure", (req, res) => {
//   res.send("Failed to authenticate..");
// });

// app.get("/verify-email/:token", verifyEmail);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  //app.use("/uploads", express.static("/var/data/uploads"));
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
module.exports = app;