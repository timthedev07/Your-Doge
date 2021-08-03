import { NextApiRequest, NextApiResponse } from "next";
import {
  getAccessTokenFromCode,
  getFacebookUserData,
} from "../../../../lib/oauth/facebook";
import { FacebookUserData } from "../../../../types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { code } = req.body;

    if (!code) {
      return res.send("Bad Request");
    }

    const accessToken = await getAccessTokenFromCode(code);

    if (!accessToken) {
      return res.send("Bad Request");
    }

    const userData: FacebookUserData | undefined = await getFacebookUserData(
      accessToken || ""
    );

    if (!userData) {
      return res.end("Bad Request");
    }

    return res.json(userData);
  }

  res.end("Method Not Allowed");
};

export default handler;
