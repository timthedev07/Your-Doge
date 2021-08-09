import { Homework } from "../generated/sub-graphql";
import { daysElapsed } from "./date";
const KEYS = process.env.YOUTUBE_API_KEYS
  ? process.env.YOUTUBE_API_KEYS.split(" ")
  : [];

export const generateTutorialKeyword = (homeworkList: [Homework]) => {
  // maping homework id to it's score
  const score: Record<number, number> = {};

  for (let i = 0, n = Math.min(homeworkList.length, 10); i < n; ++i) {
    const curr = homeworkList[i];

    score[curr.id] = daysElapsed(curr.deadline);

    if (curr.tags && curr.tags.length) {
      curr.tags;
    }
  }

  return "gcse english poetry";
};
const getUrl = (apiKey: string, keyword: string) => {
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURI(
    keyword
  )}&regionCode=US&relevanceLanguage=en&type=video&key=${apiKey}`;
};

/**
 *
 * @param keyword The keyword
 * @return youtube videoId
 */
export const getTutorial = async (
  keyword: string,
  i: number = 0
): Promise<string> => {
  if (i === KEYS.length) {
    return "";
  }

  const url = getUrl(KEYS[i], keyword);
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    return "";
    // return await getTutorial(keyword, i + 1);
  }

  const { items } = await response.json();

  return items[0].id.videoId as string;
};
