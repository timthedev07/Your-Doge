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

export const facebookOAuthUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
