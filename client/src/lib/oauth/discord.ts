import { FRONTEND_URL } from "../../constants/general";
import axios from "axios";

const API_ENDPOINT = "https://discord.com/api/v8";
const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "";

export const exchangeCode = async (code: string, clientSecret: string) => {
  const { data } = await axios({
    url: `${API_ENDPOINT}/oauth2/token`,
    method: "post",
    data: {
      client_id: CLIENT_ID,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: FRONTEND_URL + "/auth/oauth/discord",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
};

export const refreshToken = async (
  refreshToken: string,
  clientSecret: string
) => {
  const { data } = await axios({
    url: `${API_ENDPOINT}/oauth2/token`,
    method: "post",
    data: {
      client_id: CLIENT_ID,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
};
