import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useAllHomeworkQuery } from "../generated/graphql";

interface DashdoardProps {}

interface Homework {
  deadline: string;
  title: string;
  description: string;
}

export const Dashdoard: React.FC<DashdoardProps> = () => {
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [homework, setHomework] = useState<Array<Homework>>([]);

  const {
    data: gqlData,
    // loading: gqlLoading,
    // error: gqlError,
  } = useAllHomeworkQuery();

  const BUSY_CLASSES = {
    "0": "free",
    "1": "chill",
    "2": "fine",
    "3": "busy",
    "4": "intense",
    "5": "damn",
  };

  useEffect(() => {
    if (gqlData) {
      gqlData.getAllHomework.forEach((each) => {
        // pushing data to the homework state
        setHomework((prev) => [
          ...prev,
          {
            deadline: each.deadline,
            description: each.description,
            title: each.title,
          },
        ]);

        // pushing/modifying data in the record holding date: homeworkCount
        const dummy = marks;
        console.log({ each, d: each.deadline });
        if (dummy.hasOwnProperty(each.deadline)) {
          dummy[each.deadline]++;
        } else {
          dummy[each.deadline] = 1;
        }
        setMarks(dummy);
      });
    }
  }, [gqlData, marks]);

  console.log(homework);
  console.log(marks);

  return (
    <Calendar
      onChange={(dateObj) => {
        console.log(dateObj.valueOf());
      }}
      tileClassName={({ date }) => {
        if (marks.hasOwnProperty(`${date.valueOf()}`)) {
          return BUSY_CLASSES[`2`];
        }
        return "";
      }}
    />
  );
};
