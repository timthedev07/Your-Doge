import React, { useEffect, useMemo, useState } from "react";
import { FormCheck } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import { randomHomework, TagCategory } from "shared";
import { URGENCY_SCORE } from "../constants/homework";
import { useSubjectsQuery } from "../generated/graphql";
import { Homework } from "../generated/sub-graphql";
import { HomeworkSortKey } from "../types/types";
import { DashboardHomeworkListItem } from "./DashboardHomeworkListItem";
import { SubjectsSelect } from "./SubjectsSelect";

interface HomeworkListProps {}

export const HomeworkList: React.FC<HomeworkListProps> = ({}) => {
  const homeworkList: Homework[] = useMemo(() => randomHomework(1000), []);
  const [sortBy, setSortBy] = useState<HomeworkSortKey>("deadline");
  const [queryBuffer, setQueryBuffer] = useState<string>("");
  const [onlyTodo, setOnlyTodo] = useState<boolean>(false);
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const { data: subjectsData, loading: subjectsLoading } = useSubjectsQuery();
  const [sortedHomework, setSortedHomework] =
    useState<Homework[]>(homeworkList);
  const [filteredHomework, setFilteredHomework] = useState<Homework[]>([]);
  const [query, setQuery] = useState<string>("");

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

  useEffect(() => {
    console.log("Update");
    setFilteredHomework((prev) =>
      (prev.length ? prev : sortedHomework).filter(
        (value: Homework): unknown => {
          console.log(subjectFilter);
          if (!subjectsMap) return true;
          if (onlyTodo && value.done) return false;
          if (subjectFilter && subjectsMap[value.subjectId] !== subjectFilter)
            return false;
          if (query && !new RegExp(`${query}`).test(value.title)) return false;

          return true;
        }
      )
    );
  }, [onlyTodo, subjectFilter, query, subjectsMap, sortedHomework]);

  return (
    <div className="homework-list-container">
      <h2 style={{ marginRight: "auto", marginLeft: "2%" }}>Homework to do:</h2>
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
          value={queryBuffer}
          onChange={(e) => {
            setQueryBuffer(e.target.value);
          }}
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
        <div className="homework-list-wrapper">
          <ul className="homework-list">
            {(filteredHomework.length ? filteredHomework : sortedHomework).map(
              (each) => (
                <DashboardHomeworkListItem
                  key={each.id}
                  handleOpen={() => setOpenHomework(each)}
                  item={each}
                  subjectName={subjectsMap![each.subjectId]}
                />
              )
            )}
          </ul>
        </div>
      )}
      <button
        onClick={() => setCreationPanelOpen(true)}
        className="rounded-btn emphasized dashboard-new-homework-button"
      >
        New
      </button>
    </div>
  );
};
