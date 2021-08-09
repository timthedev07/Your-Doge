import { NextApiRequest, NextApiResponse } from "next";
import { exchangeCode } from "../../../../lib/oauth/discord";
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

    const { access_token } = response;

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
