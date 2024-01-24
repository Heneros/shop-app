const authenticateToken = (req, res, next) => {
  const cookieHeader = req.headers.cookie;

  if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce((cookiesObject, cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookiesObject[name] = value;
      return cookiesObject;
    }, {});

    // console.log(cookieHeader);
    const userToken = cookies.jwt;

    if (userToken) {
      // console.log("Cookie token success");
      try {
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
      } catch (err) {
        console.error("Error decoding token:", err.message);
      }
    }
  }
  next();
};

module.exports = authenticateToken;
