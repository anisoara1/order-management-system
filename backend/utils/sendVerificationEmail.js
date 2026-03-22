import nodemailer from "nodemailer";

export default async function sendVerificationEmail(to, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"OMS Support" <support@oms.com>',
    to,
    subject: "Cont verificat cu succes",
    text: message,
  });
}
