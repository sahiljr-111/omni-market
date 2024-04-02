const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authentication;
  if (!token) {
    return res.status(401).json({
      status: "Unauthorized user",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "Token not marched",
    });
  }
};
