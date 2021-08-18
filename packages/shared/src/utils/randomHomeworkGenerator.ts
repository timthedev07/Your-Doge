import { randSlug } from "./slugs";

const temp = [
  "urgent",
  "hard",
  "long-term",
  "easy",
  "normal",
  "hard-and-urgent",
];

export const randomHomework = (n: number) => {
  return Array.from(Array(n).keys()).map((each) => {
    return {
      __typename: "Homework" as "Homework",
      id: each,
      title: `${randSlug()}`,
      description: "You hate dancin",
      deadline: 1630620000000,
      subjectId: Math.ceil(Math.random() * 10),
      done: Math.random() < 0.5,
      onTime: true,
      enjoyed: false,
      topicName: "GCSE eglish literature language techniques",
      userId: 3,
      tag: temp[
        Math.random() < 0.15 ? 0 : Math.ceil(Math.random() * (temp.length - 1))
      ],
    };
  });
};
