import { v4 } from "uuid";
import { FRONTEND } from "../index";
import { prefixMap } from "../constants/email";
import { redisClient } from "../redis";

export const createActionUrl = async (
  userId: number,
  action: string,
  durationInHours?: number
) => {
  const token = v4();

  const prefixedToken = (prefixMap[action] || "dG9rZW4=:") + token;

  redisClient.set(
    prefixedToken,
    `${userId}`,
    "ex",
    60 * 60 * (durationInHours || 8)
  ); // expires in 8 hours by default(if a duration is not given)
  return `${FRONTEND}/auth/${action}/${prefixedToken}`;
};
