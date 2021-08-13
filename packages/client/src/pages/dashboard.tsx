import React, { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
// import { useApollo } from "../contexts/ApolloContext";
import { useSubjectsQuery } from "../generated/graphql";
import ContentLoader from "react-content-loader";
import ReactTooltip from "react-tooltip";
import Head from "next/head";
import { HomeworkSortKey, MarkRecordValue } from "../types/types";
import { YoutubeVideo } from "../components/YoutubeVideo";
import { Homework } from "../generated/sub-graphql";
import axios from "axios";
import { HomeworkDetails } from "../components/HomeworkDetails";
import { NewHomework } from "../components/NewHomework";
import { URGENCY_SCORE } from "../constants/homework";
import { TagCategory } from "shared";

const temp = [
  "urgent",
  "hard",
  "long-term",
  "easy",
  "normal",
  "hard-and-urgent",
];

const Dashboard: React.FC = () => {
  const [marks, setMarks] = useState<Record<string, MarkRecordValue>>({});
  const [tutorialId, setTutorialId] = useState<string>("");
  const [openHomework, setOpenHomework] = useState<Homework | undefined>(
    undefined
  );
  const [sortBy, setSortBy] = useState<HomeworkSortKey>("tag");
  const [sortedHomework, setSortedHomework] = useState<Homework[] | undefined>(
    undefined
  );
  const [creationPanelOpen, setCreationPanelOpen] = useState<boolean>(false);

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

  const homeworkList: Homework[] = useMemo(() => {
    return Array.from(Array(30).keys()).map((each) => {
      return {
        __typename: "Homework",
        id: each,
        title: `Homework ${each}`,
        description: "You hate dancin",
        deadline: 1630620000000,
        subjectId: 10,
        done: true,
        onTime: true,
        enjoyed: false,
        topicName: "GCSE eglish literature language techniques",
        userId: 3,
        tag: temp[
          Math.random() < 0.15
            ? 0
            : Math.ceil(Math.random() * (temp.length - 1))
        ],
      };
    });
  }, []);

  // this sorts the homework
  useEffect(() => {
    setSortedHomework(
      [...homeworkList].sort((a, b) => {
        if (sortBy === "tag") {
          const x = URGENCY_SCORE[a.tag as TagCategory];
          const y = URGENCY_SCORE[b.tag as TagCategory];
          return y - x;
        }
        return b[sortBy] - a[sortBy];
      })
    );
  }, [sortBy, homeworkList]);

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

  const subjectsUsed = useMemo(() => {
    if (!subjectsMap) return [];
    const res: Set<string> = new Set();

    for (const homework of homeworkList) {
      const subject = subjectsMap[homework.subjectId];
      if (!res.has(subject)) res.add(subject);
    }

    return Array.from(res);
  }, [homeworkList, subjectsMap]);

  useEffect(() => {
    (async () => {
      const { data } = { data: { videoId: "" } };
      /* await axios({
        url: "/api/gen-tutorial",
        data: {
          homeworkList,
        },
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }); */
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

        <div className="homework-list-container">
          <h2 style={{ marginRight: "auto", marginLeft: "2%" }}>
            Homework to do:
          </h2>
          <div className="homework-sort-customization-control-panel">
            <button>Hello world</button>
          </div>
          {subjectsLoading || !sortedHomework ? (
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
                {sortedHomework.map((each) => (
                  <li key={each.id} className="homework-item">
                    <div className="homework-item-innermain">
                      <div className="homework-title">{each.title}</div>
                      <div className={`homework-tag ${each.tag}`}>
                        {each.tag}
                      </div>
                    </div>
                    <div className="homework-subject">
                      {subjectsMap![each.subjectId]}
                    </div>
                    <img
                      src="/images/icons/rightarrow.svg"
                      className="homework-item-arrow"
                      alt=""
                      data-tip="Click me to view/edit details."
                      onClick={() => {
                        setOpenHomework(each);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
          <button
            onClick={() => setCreationPanelOpen(true)}
            className="rounded-btn emphasized dashboard-new-homework-button"
          >
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
