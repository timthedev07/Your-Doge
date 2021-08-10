import { Homework } from "../generated/sub-graphql";
import { daysElapsed, TagCategory } from "shared";
const KEYS = process.env.YOUTUBE_API_KEYS
  ? process.env.YOUTUBE_API_KEYS.split(" ")
  : [];

export const generateTutorialKeyword = (homeworkList: [Homework]) => {
  // mapping indices to it's score
  const scores: Record<number, number> = {};
  const valueMap: Record<TagCategory, number> = {
    "long-term": 2,
    easy: 1,
    hard: 4,
    urgent: 4,
    normal: 1,
    "hard-and-urgent": 8,
  };
  const THRESHOLD = 5;

  // only look at the first 10 items or less if there are less items
  for (let i = 0, n = Math.min(homeworkList.length, 10); i < n; ++i) {
    const curr = homeworkList[i];

    const days = daysElapsed(curr.deadline);
    const tag = curr.tag as TagCategory;
    scores[i] =
      (days < THRESHOLD ? (THRESHOLD - days) * 3 : days / days ** 1.458) +
      valueMap[tag];
  }

  let max = 0;
  let maxInd = 0;
  for (const key of Object.keys(scores)) {
    const score = scores[parseInt(key)];
    if (score > max) {
      max = score;
      maxInd = parseInt(key);
    }
  }

  return homeworkList[maxInd].topicName;
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
