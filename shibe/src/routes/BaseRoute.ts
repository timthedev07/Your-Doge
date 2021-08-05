import express from "express";
import { compile } from "handlebars";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import { HTMLFileToString } from "../utils/html";

export const router = express.Router();

router.post("/contact", async (req, res) => {
  const { fullName, topic, customerEmail, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME!,
      pass: process.env.MAIL_PASSWORD!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let html;

  try {
    const rawHtml = HTMLFileToString(path.resolve(__dirname, "../email.html"));
    const template = compile(rawHtml);

    const data = {
      text: `Contact request:
Name: ${fullName}
Topic: ${topic}
From: ${customerEmail}

Message:

${message}
`,
    };
    html = template(data);
  } catch (err) {}

  const mailOptions: Mail.Options = {
    from: `"Contact Request - Your Doge"`,
    to: "timpersonal07@gmail.com",
    subject: `Contact request - Your Doge`,
    html,
  };

  const mailResponse = await transporter.sendMail(mailOptions);

  if (mailResponse.accepted.length) {
    res.status(200).json({
      message: "Thank you for contacting us, we will reply to you ASAP!",
    });
  } else {
    res.status(400).json({ message: "Failed to send request." });
  }
});
