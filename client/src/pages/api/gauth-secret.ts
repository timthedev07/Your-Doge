import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.json({ secret: process.env.GOOGLE_CLIENT_SECRET || "" });
  }

  res.status(405).json({ message: "YOU ARE NOT SUPPOSED TO BE HERE." });
};
export default handler;
