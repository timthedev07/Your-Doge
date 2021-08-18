import { Homework } from "../generated/sub-graphql";

export const usedSubjects = (
  homeworkList: Homework[],
  subjectsMap: Record<number, string> | undefined
): string[] => {
  if (!subjectsMap) return [];

  const res: Set<string> = new Set();

  for (const homework of homeworkList) {
    const subject = subjectsMap[homework.subjectId];
    if (!res.has(subject)) res.add(subject);
  }

  return Array.from(res);
};
