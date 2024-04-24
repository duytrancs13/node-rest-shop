const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      secure: false,
      auth: {
        user: "eff0bbe93c49a1",
        pass: "0ff793a77fa6f7",
      },
    });

    await transporter.sendMail({
      // from: `Cinefix support<support@cinefix.com>`,
      // from: process.env.EMAIL_USER,
      from: "eff0bbe93c49a1",
      to: email,
      subject: subject,
      text: text,
    });

  } catch (error) {
    console.log("error: ", error);
  }
};
