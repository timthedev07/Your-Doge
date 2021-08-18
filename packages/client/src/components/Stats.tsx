import React, { useMemo } from "react";
import { Doughnut as Donut } from "react-chartjs-2";
import { Counter, randomHomework } from "shared";
import { useSubjectsQuery } from "../generated/graphql";
import { getSubjectsMap, usedSubjects } from "../lib/subjects";
import { defaults } from "react-chartjs-2";

defaults.color = "white";

export const Stats: React.FC = () => {
  const homeworkList = randomHomework(3000);
  const { data: subjectsData } = useSubjectsQuery();

  const subjectsMap: Record<number, string> | undefined = useMemo(() => {
    return getSubjectsMap(subjectsData);
  }, [subjectsData]);

  const frequency = useMemo(() => {
    return Counter(usedSubjects(homeworkList, subjectsMap, false));
  }, [homeworkList, subjectsMap]);

  return (
    <div>
      <h2>Subject Breakdown</h2>
      <div className="char-container" id="subjects-donut-container">
        <Donut
          data={{
            labels: Object.keys(frequency),
            datasets: [
              {
                label: "Subjects",
                data: Object.values(frequency),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 0, 255, 0.2)",
                  "rgba(0, 255, 255, 0.2)",
                  "rgba(205, 87, 0, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 0, 255, 1)",
                  "rgba(0, 255, 255, 1)",
                  "rgba(205, 87, 0, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
