import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const config = {
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  redirect:
    process.env.NODE_ENV === "production"
      ? "https://yourdoge.vercel.app/auth/oauth/google"
      : "http://localhost:3000/auth/oauth/google",
};

const createConnection = () => {
  return new google.auth.OAuth2(
    config.clientId,
    config.clientSecret,
    config.redirect
  );
};

const authScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email",
];

const getConnectionUrl = (auth: OAuth2Client) => {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: authScope,
  });
};

export const getGoogleAuthUrl = () => {
  return getConnectionUrl(createConnection());
};
