import React, { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
// import { useApollo } from "../contexts/ApolloContext";
import { useSubjectsQuery } from "../generated/graphql";
import ContentLoader from "react-content-loader";
import ReactTooltip from "react-tooltip";
import Head from "next/head";
import { MarkRecordValue } from "../types/types";
import { YoutubeVideo } from "../components/YoutubeVideo";
import { Homework } from "../generated/sub-graphql";
import axios from "axios";
import { HomeworkDetails } from "../components/HomeworkDetails";
import { NewHomework } from "../components/NewHomework";
import { BUSY_CLASSES, URGENCY_SCORE } from "../constants/homework";
import {
  daysToMilliseconds,
  randomHomework,
  randSlug,
  TagCategory,
} from "shared";
import { FormCheck } from "react-bootstrap";
import { SubjectsSelect } from "../components/SubjectsSelect";
import { getWithExpiry, setWithExpiry } from "../lib/localStorageExpiration";
import { DashboardHomeworkListItem } from "../components/DashboardHomeworkListItem";
import { HomeworkList } from "../components/HomeworkList";

const Dashboard: React.FC = () => {
  const homeworkList: Homework[] = useMemo(() => randomHomework(1000), []);
  const [marks, setMarks] = useState<Record<string, MarkRecordValue>>({});
  const [tutorialId, setTutorialId] = useState<string>("");
  const [openHomework, setOpenHomework] = useState<Homework | undefined>(
    undefined
  );
  const [creationPanelOpen, setCreationPanelOpen] = useState<boolean>(false);
  const { data: subjectsData, loading: subjectsLoading } = useSubjectsQuery();

  // const { burrito } = useApollo()!;

  // const {
  //   data: gqlData,
  //   // loading: gqlLoading,
  //   // error: gqlError,
  // } = useAllUserHomeworkQuery({ client: burrito });

  // a map that maps subject id to subject name
  // undefined is when the query is still loading

  // set marks on tha calendar
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

  // get tutorialId
  useEffect(() => {
    (async () => {
      const cachedVid = getWithExpiry(window.localStorage, "tutorialId");
      if (cachedVid !== null) {
        return setTutorialId(cachedVid);
      }
      const { data } = { data: { videoId: "" } };
      /* await axios({
        url: "/api/gen-tutorial",
        data: {
          homeworkList,
        },
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }); */
      setWithExpiry(
        window.localStorage,
        "tutorialId",
        data.videoId,
        new Date().valueOf() + daysToMilliseconds(1)
      );
      setTutorialId(data.videoId);
    })();
  }, [homeworkList]);

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

        <HomeworkList />

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
            videoId={tutorialId}
          ></YoutubeVideo>
        </div>
      </div>
      {openHomework && subjectsData && (
        <HomeworkDetails
          setHomework={setOpenHomework}
          subjects={subjectsData}
          homework={openHomework}
        />
      )}
      {subjectsLoading || !subjectsData ? null : (
        <NewHomework
          subjects={subjectsData}
          open={creationPanelOpen}
          setOpen={setCreationPanelOpen}
        />
      )}
    </>
  );
};

export default Dashboard;
