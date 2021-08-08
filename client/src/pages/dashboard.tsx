import React, {
  /* useState, useEffect, */ useEffect,
  useMemo,
  useState,
} from "react";
import Calendar from "react-calendar";
// import { useApollo } from "../contexts/ApolloContext";
import { useSubjectsQuery } from "../generated/graphql";
import ContentLoader from "react-content-loader";
import ReactTooltip from "react-tooltip";
import Head from "next/head";
import { MarkRecordValue } from "../types/types";
import { YoutubeVideo } from "../components/YoutubeVideo";

const Dashboard: React.FC = () => {
  const [marks, setMarks] = useState<Record<string, MarkRecordValue>>({});

  // const { burrito } = useApollo()!;

  // const {
  //   data: gqlData,
  //   // loading: gqlLoading,
  //   // error: gqlError,
  // } = useAllUserHomeworkQuery({ client: burrito });

  const BUSY_CLASSES: Record<string, string> = {
    "0": "free",
    "1": "chill",
    "2": "fine",
    "3": "busy",
    "4": "intense",
    "5": "dangit",
  };

  const homeworkList = Array.from(Array(10).keys()).map((each) => {
    return {
      id: each,
      title: `Homework ${each}`,
      description: "You hate dancin",
      deadline: 1630620000000,
      subjectId: 10,
      done: true,
      onTime: true,
      enjoyed: false,
    };
  });

  useEffect(() => {
    if (homeworkList) {
      homeworkList.forEach((each) => {
        // pushing data to the homework state
        // pushing/modifying data in the record holding date: homeworkCount
        const dummy = marks;
        if (dummy.hasOwnProperty(each.deadline)) {
          dummy[each.deadline].count++;
        } else {
          dummy[each.deadline] = { count: 1, homeworkList: [] };
        }
        dummy[`${each.deadline}`].homeworkList.push({
          deadline: each.deadline,
          description: each.description,
          title: each.title,
        });
        setMarks(dummy);
      });
    }
  }, [marks, homeworkList]);

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

  return (
    <>
      <Head>
        <title>Dashboard | Your Doge</title>
      </Head>
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
                {homeworkList.map((each) => (
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

        <div className="dashboard-bottom-section">
          <Calendar
            className="big-ass-calendar"
            tileClassName={({ date }) => {
              const valueStr = `${date.valueOf()}`;

              if (marks.hasOwnProperty(valueStr)) {
                const key: string = JSON.stringify(marks[valueStr].count);
                return parseInt(key) > 5 ? "dangit" : BUSY_CLASSES[key];
              }
              return "";
            }}
          />
          <YoutubeVideo
            className="dashboard-video"
            videoId="EmCGF49Uils"
          ></YoutubeVideo>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
