import { FRONTEND_URL } from "../../constants/general";
import axios from "axios";

const API_ENDPOINT = "https://discord.com/api/v8";
const CLIENT_ID = "870745774852567091";
const CLIENT_SECRET = "937it3ow87i4ery69876wqire";

export const exchange_code = async (code: string) => {
  const { data } = await axios({
    url: `${API_ENDPOINT}/oauth2/token`,
    method: "post",
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: FRONTEND_URL,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
};
