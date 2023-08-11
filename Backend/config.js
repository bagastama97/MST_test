require("dotenv").config();
module.exports = {
  dbURL: process.env.dbURL,
  secretKey: process.env.secretKey,
  senderEmail: process.env.senderEmail,
  passSenderEmail: process.env.passSenderEmail,
};
