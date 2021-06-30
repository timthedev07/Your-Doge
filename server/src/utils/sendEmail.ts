import nodemailer from "nodemailer";

export const sendEmail = async (recipient: string, url: string) => {
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

  const html = `
		<!DOCTYPE html>
		<html>
			<head></head>
			<body
				style="
					background-color: #3e3e3e;
					color: white;
					font-family: 'Trebuchet MS', sans-serif;
					padding: 10px;
					margin: 0;
				"
			>
				<img style="width: 100%" src="https://drive.google.com/uc?export=view&id=1_vAyaRaZuSo3pki-PzaCFFEdiNiPbXI5" />
				<h1 style="text-align: center;">Click the link below to verify your email.</h1>
				<a style="color: goldenrod; text-align: center;" href="${url}">Verify email</a>
			</body>
		</html>
    `;

  // send mail with defined transport object
  const mailOptions = {
    from: `"Your Doge - No Reply" <${process.env.USERNAME}>`,
    to: recipient,
    subject: `Confirm your email: Your Doge`,
    html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};
