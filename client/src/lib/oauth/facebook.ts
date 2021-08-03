import axios from "axios";
import queryString from "query-string";
import { FRONTEND_URL } from "../../constants/general";

const stringifiedParams = queryString.stringify({
  client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
  redirect_uri: `${FRONTEND_URL}/auth/oauth/facebook`,
  scope: "email", // comma seperated string
  response_type: "code",
  auth_type: "rerequest",
  display: "popup",
});

export const getAccessTokenFromCode = async (code: string) => {
  try {
    const { data } = await axios({
      url: "https://graph.facebook.com/v4.0/oauth/access_token",
      method: "get",
      params: {
        client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        redirect_uri: `${FRONTEND_URL}/auth/oauth/facebook`,
        code,
      },
    });
    /**
     * data: { access_token: string, token_type: string, expires_in: number }
     */
    return data.access_token as string;
  } catch (err) {
    return "";
  }
};

export const getFacebookUserData = async (accessToken: string) => {
  try {
    const { data } = await axios({
      url: "https://graph.facebook.com/me",
      method: "get",
      params: {
        fields: ["id", "email", "first_name", "last_name"].join(","),
        access_token: accessToken,
      },
    });
    console.log(data);
    /**
     * data: { id: idk?, email, first_name, last_name }
     */
    return data;
  } catch (err) {
    return undefined;
  }
};

export const facebookOAuthUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
