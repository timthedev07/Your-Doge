import { SubjectsQuery } from "../generated/graphql";
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

export const getSubjectsMap = (
  subjectsData: SubjectsQuery | undefined
): Record<number, string> | undefined => {
  if (!subjectsData) {
    return;
  }

  const res: Record<number, string> = {};

  subjectsData?.subjects.forEach((each) => {
    res[each.id] = each.name;
  });

  return res;
};
