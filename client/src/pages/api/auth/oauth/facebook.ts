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
      return res.status(400).send("Bad Request");
    }

    const accessToken = await getAccessTokenFromCode(code);

    if (!accessToken) {
      return res.status(400).send("Bad Request");
    }

    const userData: FacebookUserData | undefined = await getFacebookUserData(
      accessToken || ""
    );

    if (!userData) {
      return res.status(400).send("Bad Request");
    }

    return res.status(200).json(userData);
  }

  res.status(405).send("Method Not Allowed");
};

export default handler;
