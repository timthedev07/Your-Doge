import { NextApiRequest, NextApiResponse } from "next";
import { generateTutorialKeyword, getTutorial } from "../../lib/tutorial";
import { HomeworkForCalendarMark } from "../../types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.end("You shall not pass.");
  }

  if (!req.body.homeworkList) {
    return res.end("You shall not pass.");
  }

  // we assume the homework passed in are the most recent ones
  const { homeworkList }: { homeworkList: [HomeworkForCalendarMark] } =
    req.body;

  const keyword = generateTutorialKeyword(homeworkList);
  const id = await getTutorial(keyword);

  return res.json({ videoId: id });
};

export default handler;
