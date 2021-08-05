import nodemailer from "nodemailer";
import { HTMLFileToString } from "./html";
import path from "path";
import Mail from "nodemailer/lib/mailer";
import { compile } from "handlebars";

export const sendEmail = async (
  recipient: string,
  url: string,
  verb: string,
  noun: string,
  text?: string
) => {
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
      text,
      extraHTML: `<a href="${url}">
        <button
          style="
            width: 210px;
            height: 30px;
            font-size: 20px;
            outline: none;
            border: none;
            border-radius: 8px;
            background-color: #cf5300;
            color: black;
          "
          type="submit"
        >
          ${verb.charAt(0).toUpperCase() + verb.slice(1)}
        </button>
      </a>
      `,
    };
    html = template(data);
  } catch (err) {}

  const mailOptions: Mail.Options = {
    from: `"Your Doge - No Reply" <${process.env.USERNAME}>`,
    to: recipient,
    subject: `${verb.charAt(0).toUpperCase() + verb.slice(1)} your ${noun}`,
    html,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};
