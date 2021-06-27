import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useAllUserHomeworkQuery } from "../generated/graphql";

interface DashdoardProps {}

interface Homework {
  deadline: string;
  title: string;
  description: string;
}

interface MarkRecordValue {
  count: number;
  homeworkList: Array<Homework>;
}

export const Dashboard: React.FC<DashdoardProps> = () => {
  const [marks, setMarks] = useState<Record<string, MarkRecordValue>>({});

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

        // pushing/modifying data in the record holding date: homeworkCount
        const dummy = marks;
        if (dummy.hasOwnProperty(each.deadline)) {
          dummy[each.deadline].count++;
        } else {
          dummy[each.deadline] = { count: 1, homeworkList: [] };
        }
        dummy[each.deadline].homeworkList.push({
          deadline: each.deadline,
          description: each.description,
          title: each.title,
        });
        setMarks(dummy);
      });
    }
  }, [gqlData, marks]);

  console.log(marks);

  return (
    <div className="calendar-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <Calendar
        className="big-ass-calendar"
        tileClassName={({ date }) => {
          const valueStr = `${date.valueOf()}`;
          if (marks.hasOwnProperty(valueStr)) {
            console.log("here we go boys");
            const key: string = JSON.stringify(marks[valueStr].count);
            return parseInt(key) > 5 ? "damn" : BUSY_CLASSES[key];
          }
          return "";
        }}
      />
    </div>
  );
};
