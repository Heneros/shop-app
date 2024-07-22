const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   sameSite: "none",
  //   secure: true,
  //   domain: "react-shop-app-frontend.onrender.com",
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  //   // path: "/",
  // });

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    })
  );

  // res.json({ token });
  // return token;
};

module.exports = generateToken;
