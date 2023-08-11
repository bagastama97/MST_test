const User = require("../models/userModel");
const { hashPassword, comparePasswords } = require("../helpers/bcryptHelper");
const { generateToken } = require("../helpers/jwtHelper");
const {
  sendRegistrationEmail,
  sendPasswordResetEmail,
} = require("../helpers/mailerHelper");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  try {
    const { Username, Password, email, fullName } = req.body;

    const hashedPassword = await hashPassword(Password);
    const newUser = new User({
      Username,
      Password: hashedPassword,
      email,
      fullName,
      photo: req.file.filename,
    });

    await newUser.save();
    await sendRegistrationEmail(email);
    res
      .status(201)
      .send("Registrasi berhasil, silakan cek email Anda untuk verifikasi");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat registrasi");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, Password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email atau salah");
    }
    const isPasswordValid = await comparePasswords(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(400).send("atau password salah");
    }

    const tokenData = {
      username: user.Username,
      email: user.email,
      fullName: user.fullName,
      photo: user.photo,
    };
    const token = generateToken(tokenData);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat login");
  }
};
const createVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
const sendPasswordResetLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("Email tidak terdaftar");
    }

    const resetToken = createVerificationToken();
    user.resetToken = resetToken;

    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.status(200).send("Email reset password telah dikirim");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Terjadi kesalahan saat mengirim email reset password");
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
    });
    if (!user) {
      return res.status(404).send("Token reset tidak valid");
    }

    user.Password = await hashPassword(newPassword);
    user.resetToken = null;

    await user.save();

    res.status(200).send("Password berhasil direset");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mereset password");
  }
};
module.exports = {
  registerUser,
  loginUser,
  sendPasswordResetLink,
  resetPassword,
};
