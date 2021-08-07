import React, { /* useState, useEffect, */ useMemo } from "react";
import Calendar from "react-calendar";
// import { useApollo } from "../contexts/ApolloContext";
import { useSubjectsQuery } from "../generated/graphql";
// import { MarkRecordValue } from "../types/types";
import ContentLoader from "react-content-loader";
import ReactTooltip from "react-tooltip";

const Dashboard: React.FC = () => {
  // const [marks] = useState<Record<string, MarkRecordValue>>({});

  // const { burrito } = useApollo()!;

  // const {
  //   data: gqlData,
  //   // loading: gqlLoading,
  //   // error: gqlError,
  // } = useAllUserHomeworkQuery({ client: burrito });

  // const BUSY_CLASSES: Record<string, string> = {
  //   "0": "free",
  //   "1": "chill",
  //   "2": "fine",
  //   "3": "busy",
  //   "4": "intense",
  //   "5": "dangit",
  // };

  // useEffect(() => {
  //   if (gqlData) {
  //     // gqlData.getAllUserHomework.homeworkList.forEach((each) => {
  //     //   // pushing data to the homework state
  //     //   // pushing/modifying data in the record holding date: homeworkCount
  //     //   const dummy = marks;
  //     //   if (dummy.hasOwnProperty(each.deadline)) {
  //     //     dummy[each.deadline].count++;
  //     //   } else {
  //     //     dummy[each.deadline] = { count: 1, homeworkList: [] };
  //     //   }
  //     //   dummy[each.deadline].homeworkList.push({
  //     //     deadline: each.deadline,
  //     //     description: each.description,
  //     //     title: each.title,
  //     //   });
  //     //   setMarks(dummy);
  //     // });
  //   }
  // }, [gqlData, marks]);

  const { data: subjectsData, loading: subjectsLoading } = useSubjectsQuery();

  // a map that maps subject id to subject name
  // undefined is when the query is still loading
  const subjectsMap: Record<number, string> | undefined = useMemo(() => {
    if (!subjectsData) {
      return;
    }

    const res: Record<number, string> = {};

    subjectsData?.subjects.forEach((each) => {
      res[each.id] = each.name;
    });

    return res;
  }, [subjectsData]);

  const fakeHomework = [
    {
      id: 10,
      title: "Homework 0",
      description: "Dumb homework",
      deadline: "",
      subjectId: 9,
      done: false,
      onTime: false,
      enjoyed: false,
    },
    {
      id: 9,
      title: "Homework 1",
      description: "Still dumb homework",
      deadline: "",
      subjectId: 10,
      done: true,
      onTime: true,
      enjoyed: false,
    },
    // {
    //   id: 11,
    //   title: "Homework 2",
    //   description: "Still dumb homework",
    //   deadline: "",
    //   subjectId: 10,
    //   done: true,
    //   onTime: true,
    //   enjoyed: false,
    // },
    // {
    //   id: 12,
    //   title: "Homework 3",
    //   description: "Still dumb homework",
    //   deadline: "",
    //   subjectId: 10,
    //   done: true,
    //   onTime: true,
    //   enjoyed: false,
    // },
    // {
    //   id: 13,
    //   title: "Homework 4",
    //   description: "Still dumb homework",
    //   deadline: "",
    //   subjectId: 10,
    //   done: true,
    //   onTime: true,
    //   enjoyed: false,
    // },
  ];

  return (
    <>
      <ReactTooltip />

      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="background" />
          <h1 className="dashboard-heading">Hello hooman.</h1>
          <h4 className="dashboard-subheading">{new Date().toDateString()}</h4>
        </header>

        <div className="homework-list-container">
          {subjectsLoading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "20px",
              }}
            >
              <ContentLoader
                foregroundColor="#555555"
                backgroundColor="#505050"
                height={"280px"}
                width={"100%"}
              >
                <rect x="10" y="15" rx="5" ry="5" width="98%" height="40" />
                <rect x="10" y="75" rx="5" ry="5" width="98%" height="40" />
                <rect x="10" y="135" rx="5" ry="5" width="98%" height="40" />
                <rect x="10" y="195" rx="5" ry="5" width="98%" height="40" />
              </ContentLoader>
            </div>
          ) : (
            <>
              <ul className="homework-list">
                {fakeHomework.map((each) => (
                  <li key={each.id} className="homework-item">
                    <div className="homework-title">{each.title}</div>
                    <div className="homework-subject">
                      {subjectsMap![each.subjectId]}
                    </div>
                    <img
                      src="/images/icons/rightarrow.svg"
                      className="homework-item-arrow"
                      alt=""
                      data-tip="Click me to view/edit details."
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
          <button className="rounded-btn emphasized dashboard-new-homework-button">
            New
          </button>
        </div>

        <Calendar
          className="big-ass-calendar"
          // tileClassName={({ date }) => {
          //   const valueStr = `${date.valueOf()}`;
          //   if (marks.hasOwnProperty(valueStr)) {
          //     const key: string = JSON.stringify(marks[valueStr].count);
          //     return parseInt(key) > 5 ? "damn" : BUSY_CLASSES[key];
          //   }
          //   return "";
          // }}
        />
      </div>
    </>
  );
};

export default Dashboard;
