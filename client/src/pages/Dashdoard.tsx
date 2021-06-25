import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useAllUserHomeworkQuery } from "../generated/graphql";

interface DashdoardProps {}

interface Homework {
  deadline: string;
  title: string;
  description: string;
}

export const Dashdoard: React.FC<DashdoardProps> = () => {
  const [marks, setMarks] = useState<Record<string, number>>({});
  // eslint-disable-next-line
  const [homework, setHomework] = useState<Array<Homework>>([]);

  const {
    data: gqlData,
    // loading: gqlLoading,
    // error: gqlError,
  } = useAllUserHomeworkQuery();

  const BUSY_CLASSES: Record<string, string> = {
    "0": "free",
    "1": "chill",
    "2": "fine",
    "3": "busy",
    "4": "intense",
    "5": "damn",
  };

  useEffect(() => {
    if (gqlData) {
      gqlData.getAllUserHomework.homeworkList.forEach((each) => {
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

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(dateObj) => {
          console.log(dateObj.valueOf());
        }}
        className="big-ass-calendar"
        tileClassName={({ date }) => {
          const valueStr = `${date.valueOf()}`;
          if (marks.hasOwnProperty(valueStr)) {
            const key: string = JSON.stringify(marks[valueStr]);
            return BUSY_CLASSES[key];
          }
          return "";
        }}
      />
    </div>
  );
};
