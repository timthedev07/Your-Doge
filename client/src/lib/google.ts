import axios from "axios";
import * as queryString from "query-string";
import { FRONTEND_URL } from "../constants/general";

const stringifiedParams = queryString.stringify({
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  redirect_uri: `${FRONTEND_URL}/auth/oauth/google`,
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "), // space seperated string
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});

const getAccessTokenFromCode = async (code: string) => {
  try {
    const { secret } = await (await fetch("/api/gauth-secret")).json();

    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: secret,
        redirect_uri: `${FRONTEND_URL}/auth/oauth/google`,
        grant_type: "authorization_code",
        code,
      },
    });

    return data.access_token;
  } catch (err) {
    return;
  }
};

export const getGoogleUserInfo = async (code: string) => {
  const accessToken: string = await getAccessTokenFromCode(code);

  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
