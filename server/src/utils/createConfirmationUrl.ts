import { v4 } from "uuid";
import { DEV_FRONTEND, FRONTEND_URL } from "..";
import { redis } from "../redis";

export const createConfirmationUrl = async (userId: number) => {
  const id = v4();
  await redis.set(id, userId, "ex", 60 * 60 * 8); // expires in 8 hours
  return `${
    process.env.NODE_ENV === "production" ? FRONTEND_URL : DEV_FRONTEND
  }/confirm/${id}`;
};
