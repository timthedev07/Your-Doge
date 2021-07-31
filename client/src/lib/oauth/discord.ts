import { FRONTEND_URL } from "../../constants/general";
import axios from "axios";

const API_ENDPOINT = "https://discord.com/api/v8";
const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "";

/**
 * Get access token from the discord api with the given code
 * @param code
 * @param clientSecret
 * @returns Access token
 */
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

/**
 * This function is used when the old current access token is expired
 * @param refreshToke
 * @param clientSecret
 * @returns new accessToken
 */
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
