const jwt = require("jsonwebtoken");
const config = require("../config");

const authMiddleware = (req, res, next) => {
  const token = req.header("access_token");

  if (!token) {
    return res.status(401).send("Token tidak tersedia, otorisasi gagal");
  }

  try {
    console.log("first");
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).send("Token tidak valid, otorisasi gagal");
  }
};

module.exports = authMiddleware;
