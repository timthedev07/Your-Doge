import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { BUSY_CLASSES, URGENCY_SCORE } from "../constants/homework";
import { daysToMilliseconds, randSlug, TagCategory } from "shared";
import { FormCheck } from "react-bootstrap";
import { SubjectsSelect } from "../components/SubjectsSelect";
import { getWithExpiry, setWithExpiry } from "../lib/localStorageExpiration";
import { DashboardHomeworkListItem } from "../components/DashboardHomeworkListItem";

const temp = [
  "urgent",
  "hard",
  "long-term",
  "easy",
  "normal",
  "hard-and-urgent",
];

const Dashboard: React.FC = () => {
  const homeworkList: Homework[] = useMemo(() => {
    return Array.from(Array(1000).keys()).map((each) => {
      return {
        __typename: "Homework",
        id: each,
        title: `${randSlug()}`,
        description: "You hate dancin",
        deadline: 1630620000000,
        subjectId: Math.ceil(Math.random() * 20),
        done: Math.random() < 0.5,
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
  const [marks, setMarks] = useState<Record<string, MarkRecordValue>>({});
  const [tutorialId, setTutorialId] = useState<string>("");
  const [openHomework, setOpenHomework] = useState<Homework | undefined>(
    undefined
  );
  const [sortBy, setSortBy] = useState<HomeworkSortKey>("deadline");
  const [sortedHomework, setSortedHomework] = useState<Homework[]>(
    homeworkList || []
  );
  const [query, setQuery] = useState<string>("");
  const queryRef = useRef<HTMLInputElement>(null);
  const [creationPanelOpen, setCreationPanelOpen] = useState<boolean>(false);
  const [onlyTodo, setOnlyTodo] = useState<boolean>(false);
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const { data: subjectsData, loading: subjectsLoading } = useSubjectsQuery();

  // const { burrito } = useApollo()!;

  // const {
  //   data: gqlData,
  //   // loading: gqlLoading,
  //   // error: gqlError,
  // } = useAllUserHomeworkQuery({ client: burrito });

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

  // sorting
  useEffect(() => {
    setSortedHomework(() => {
      return [...homeworkList].sort((a, b) => {
        if (sortBy === "tag") {
          const x = URGENCY_SCORE[a.tag as TagCategory];
          const y = URGENCY_SCORE[b.tag as TagCategory];
          return y - x;
        }
        return b[sortBy] - a[sortBy];
      });
    });
  }, [sortBy, homeworkList]);

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

  useEffect(() => {
    const delay = setTimeout(() => {
      setQuery(queryRef?.current?.value || "");
    }, 1500);

    return () => clearTimeout(delay);
  }, [queryRef?.current?.value]);

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
            <div>
              <label className="option-label">Rank by:&nbsp;&nbsp;&nbsp;</label>
              <select
                onChange={(e) => {
                  setSortBy(e.target.value as HomeworkSortKey);
                }}
                value={sortBy}
                style={{ width: "110px" }}
              >
                <option value="deadline">Deadline</option>
                <option value="tag">Tag</option>
              </select>
            </div>
            &nbsp; &nbsp; &nbsp;
            <div>
              <label className="option-label">Subject:&nbsp;&nbsp;&nbsp;</label>
              <SubjectsSelect
                subjects={subjectsUsed}
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                placeholder="All subjects"
                style={{ width: "170px" }}
                disablePlaceholder={false}
              />
            </div>
            <input
              className="homework-search-bar"
              type="text"
              placeholder="Search"
              ref={queryRef}
            />
            <div style={{ marginLeft: "auto" }}>
              <label className="option-label" style={{ display: "inline" }}>
                To-do only:&nbsp;&nbsp;&nbsp;
              </label>
              <FormCheck
                id="switchEnabled"
                type="switch"
                checked={onlyTodo}
                onChange={() => setOnlyTodo((prev) => !prev)}
                style={{ display: "inline" }}
              />
            </div>
          </div>

          {subjectsLoading || !sortedHomework.length || !subjectsMap ? (
            <div
              style={{
                width: "90%",
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
                <rect x="0" y="15" rx="5" ry="5" width="100%" height="40" />
                <rect x="0" y="75" rx="5" ry="5" width="100%" height="40" />
                <rect x="0" y="135" rx="5" ry="5" width="100%" height="40" />
                <rect x="0" y="195" rx="5" ry="5" width="100%" height="40" />
              </ContentLoader>
            </div>
          ) : (
            <>
              <div className="homework-list-wrapper">
                <ul className="homework-list">
                  {sortedHomework
                    .filter((each) => (onlyTodo ? !each.done : true))
                    .filter((each) =>
                      subjectFilter.length
                        ? subjectsMap[each.subjectId] === subjectFilter
                        : true
                    )
                    .filter((each) =>
                      query ? new RegExp(`${query}`).test(each.title) : true
                    )
                    .map((each) => (
                      <DashboardHomeworkListItem
                        key={each.id}
                        handleOpen={() => setOpenHomework(each)}
                        item={each}
                        subjectName={subjectsMap![each.subjectId]}
                      />
                    ))}
                </ul>
              </div>
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
