import { TagCategory } from "shared";

export const URGENCY_SCORE: Record<TagCategory, number> = {
  easy: 1,
  "long-term": 2,
  normal: 3,
  hard: 4,
  urgent: 5,
  "hard-and-urgent": 6,
};
