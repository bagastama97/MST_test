// app.js
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
const port = 3002;
app.use(cors());
mongoose.connect(config.dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Koneksi MongoDB gagal:"));
db.once("open", () => {
  console.log("Terhubung ke database MongoDB");
});

app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
