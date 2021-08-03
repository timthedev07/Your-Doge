import { NextApiRequest, NextApiResponse } from "next";
import { exchangeCode } from "../../../../lib/oauth/discord";
import { serialize } from "cookie";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { code } = req.body;
    const response = await exchangeCode(
      code,
      process.env.DISCORD_CLIENT_SECRET || ""
    );

    if (!response) {
      return res.send("Bad Request");
    }

    const { access_token, refresh_token } = response;

    res.setHeader(
      "Set-Cookie",
      serialize("FBIsecret", refresh_token, { secure: true })
    );

    try {
      const { data } = await axios({
        url: "https://discordapp.com/api/users/@me",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return res.json(data);
    } catch (err) {
      return res.send("Bad Request");
    }
  }

  res.send("Method Not Allowed");
};

export default handler;
