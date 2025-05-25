const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, token) => {
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;

  const info = await transporter.sendMail({
    from: `"Chill Movies" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verifikasi Email Anda",
    html: `<p>Silakan klik link berikut untuk memverifikasi email Anda:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
};

module.exports = sendVerificationEmail;
