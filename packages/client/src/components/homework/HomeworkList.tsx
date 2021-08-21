import React, { useMemo, useState } from "react";
import ContentLoader from "react-content-loader";
import { randomHomework } from "shared";
import { useSubjectsQuery } from "../../generated/graphql";
import { Homework } from "../../generated/sub-graphql";
import { getSubjectsMap } from "../../lib/subjects";
import { DashboardHomeworkListItem } from "./DashboardHomeworkListItem";
import { HomeworkSearchBar } from "./HomeworkSearchBar";

interface HomeworkListProps {
  setCreationPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenHomework: React.Dispatch<React.SetStateAction<Homework | undefined>>;
}

export const HomeworkList: React.FC<HomeworkListProps> = ({
  setCreationPanelOpen,
  setOpenHomework,
}) => {
  const homeworkList: Homework[] = useMemo(() => randomHomework(50), []);
  const { data: subjectsData, loading: subjectsLoading } = useSubjectsQuery();
  const [sortedHomework, setSortedHomework] =
    useState<Homework[]>(homeworkList);
  const [filterFunction, setFilterFunction] = useState<
    ((value: Homework) => unknown) | undefined
  >(undefined);

  const subjectsMap: Record<number, string> | undefined = useMemo(() => {
    return getSubjectsMap(subjectsData);
  }, [subjectsData]);
  // sorting

  return (
    <div className="homework-list-container">
      <h2 style={{ marginRight: "auto", marginLeft: "2%" }}>Homework to do:</h2>
      <HomeworkSearchBar
        {...{
          homeworkList,
          setFilterFunction,
          setSortedHomework,
          sortedHomework,
          subjectsMap,
        }}
      />
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
            {(typeof filterFunction === "function"
              ? sortedHomework.filter(filterFunction)
              : sortedHomework
            ).map((each) => (
              <DashboardHomeworkListItem
                key={each.id}
                handleOpen={() => setOpenHomework(each)}
                item={each}
                subjectName={subjectsMap![each.subjectId]}
              />
            ))}
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
