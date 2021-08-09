import { NextApiRequest, NextApiResponse } from "next";
import { getGoogleUserInfo } from "../../../../lib/oauth/google";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { code } = req.body;

    const result = await getGoogleUserInfo(code);

    return res.json(result);
  }

  res.send("Method Not Allowed");
};

export default handler;
