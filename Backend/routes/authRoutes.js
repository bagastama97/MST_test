const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../helpers/multerHelper");
const authMiddleware = require("../middleware/authMiddleware");
const path = require("path");

router.post("/register", upload.single("photo"), userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/home", authMiddleware, (req, res) => {
  res.json({ data: req.user });
});
router.post("/resetemail", userController.sendPasswordResetLink);
router.post("/reset", userController.resetPassword);
router.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "../assets", imageName);

  res.sendFile(imagePath);
});
module.exports = router;
