import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormCheck } from "react-bootstrap";
import { TagCategory } from "shared";
import { URGENCY_SCORE } from "../constants/homework";
import { Homework } from "../generated/sub-graphql";
import { usedSubjects } from "../lib/subjects";
import { HomeworkSortKey } from "../types/types";
import { SubjectsSelect } from "./SubjectsSelect";

interface HomeworkSearchBarProps {
  subjectsMap: Record<number, string> | undefined;
  homeworkList: Homework[];
  setSortedHomework: React.Dispatch<React.SetStateAction<Homework[]>>;
  setFilterFunction: React.Dispatch<
    React.SetStateAction<((value: Homework) => unknown) | undefined>
  >;
}

export const HomeworkSearchBar: React.FC<HomeworkSearchBarProps> = ({
  subjectsMap,
  homeworkList,
  setSortedHomework,
  setFilterFunction,
}) => {
  const [sortBy, setSortBy] = useState<HomeworkSortKey>("deadline");
  const [onlyTodo, setOnlyTodo] = useState<boolean>(false);
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const queryInputRef = useRef<HTMLInputElement>(null);

  const subjectsUsed = useMemo(() => {
    return usedSubjects(homeworkList, subjectsMap);
  }, [homeworkList, subjectsMap]);

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
  }, [sortBy, homeworkList, setSortedHomework]);

  useEffect(() => {
    setFilterFunction(() => (value: Homework) => {
      if (!subjectsMap) return true;
      if (onlyTodo && value.done) return false;
      if (subjectFilter && subjectsMap[value.subjectId] !== subjectFilter)
        return false;
      if (query && !new RegExp(`${query}`).test(value.title)) return false;

      return true;
    });
  }, [onlyTodo, subjectFilter, query, subjectsMap, setFilterFunction]);

  return (
    <div className="homework-sort-customization-control-panel">
      <div className="option">
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
      <div className="option">
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
      <div className="homework-search-bar option">
        <input ref={queryInputRef} type="text" placeholder="Search" />
        <button
          onClick={() => {
            setQuery(queryInputRef.current ? queryInputRef.current.value : "");
          }}
        >
          <img src="/images/icons/search.svg" alt="" />
        </button>
      </div>
      <div className="option" style={{ marginLeft: "auto" }}>
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
  );
};
