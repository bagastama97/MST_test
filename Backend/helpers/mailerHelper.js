const nodemailer = require("nodemailer");
const { senderEmail, passSenderEmail } = require("../config");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: senderEmail,
    pass: passSenderEmail,
  },
});

const sendRegistrationEmail = async (recipientEmail) => {
  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: "Registrasi Berhasil",
    text: "Selamat, Anda telah berhasil mendaftar!",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email notifikasi registrasi berhasil dikirim");
  } catch (error) {
    console.error("Gagal mengirim email notifikasi registrasi:", error);
  }
};
const sendPasswordResetEmail = async (recipientEmail, resetToken) => {
  try {
    const mailOptions = {
      from: senderEmail,
      to: recipientEmail,
      subject: "Reset Password",
      text: `Here your reset token: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email reset password berhasil dikirim");
  } catch (error) {
    console.error("Gagal mengirim email reset password:", error);
  }
};

module.exports = { sendRegistrationEmail, sendPasswordResetEmail };
