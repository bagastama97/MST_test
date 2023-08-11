const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (data) => {
  console.log(data);
  return jwt.sign(data, config.secretKey, { expiresIn: "1h" });
};

module.exports = { generateToken };
