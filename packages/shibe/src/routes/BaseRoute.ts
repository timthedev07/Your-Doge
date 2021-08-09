import express from "express";
import { compile } from "handlebars";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import { HTMLFileToString } from "../utils/html";
import { validateHuman } from "../utils/validateHuman";

export const router = express.Router();

router.post("/contact", async (req, res) => {
  const { fullName, topic, customerEmail, message, recaptchaToken } = req.body;

  if (!recaptchaToken || !(await validateHuman(recaptchaToken))) {
    throw new Error("Human validation failed.");
  }

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
      extraHTML: `
<div style="color: black;">
  <h2>Contact request:</h2>
  <h3>Name: ${fullName}</h3>
  <h3>Topic: ${topic}</h3>
  <h3>From: ${customerEmail}</h3>

  <h3>Message:</h3>

  <p>${message}</p>
<div>
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
