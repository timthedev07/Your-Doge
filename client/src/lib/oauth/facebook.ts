import queryString from "query-string";

const stringifiedParams = queryString.stringify({
  client_id: process.env.APP_ID_GOES_HERE,
  redirect_uri: "https://www.example.com/authenticate/facebook/",
  scope: ["email", "user_friends"].join(","), // comma seperated string
  response_type: "code",
  auth_type: "rerequest",
  display: "popup",
});

export const facebookOAuthUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
