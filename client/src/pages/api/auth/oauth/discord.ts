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
      return res.end("Bad Request");
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

      console.log(data);

      return res.json(data);
    } catch (err) {
      console.log(err);
      return res.end("Bad Request");
    }
  }

  res.end("Method Not Allowed");
};

export default handler;
