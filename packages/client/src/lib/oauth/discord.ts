import { FRONTEND_URL } from "../../constants/general";
import axios from "axios";
import { DiscordAccessTokenResponse } from "../../types/types";
import { jsonToUrlParams } from "shared";

const API_ENDPOINT = "https://discord.com/api/v8";
const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "";

/**
 * Get access token from the discord api with the given code.
 *
 * Returns null on error
 * @param code
 * @param clientSecret
 * @returns Object
 */
export const exchangeCode: (
  code: string,
  clientSecret: string
) => Promise<DiscordAccessTokenResponse | null> = async (
  code: string,
  clientSecret: string
) => {
  try {
    const requestData = {
      client_id: CLIENT_ID,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: FRONTEND_URL + "/auth/oauth/discord",
    };

    const { data }: { data: DiscordAccessTokenResponse } = await axios({
      url: `${API_ENDPOINT}/oauth2/token`,
      method: "post",
      data: jsonToUrlParams(requestData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data;
  } catch (err) {
    return null;
  }
};

/**
 * This function is used when the old current access token is expired
 * @param refreshToke
 * @param clientSecret
 * @returns new accessToken
 */
export const refreshToken: (
  refreshToken: string,
  clientSecret: string
) => Promise<DiscordAccessTokenResponse> = async (
  refreshToken: string,
  clientSecret: string
) => {
  const { data } = await axios({
    url: `${API_ENDPOINT}/oauth2/token`,
    method: "post",
    data: jsonToUrlParams({
      client_id: CLIENT_ID,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
};

export const discordOAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || ""
}&redirect_uri=${encodeURIComponent(
  `${FRONTEND_URL}/auth/oauth/discord`
)}&response_type=code&scope=identify%20email`;
