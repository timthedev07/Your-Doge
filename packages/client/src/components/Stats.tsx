import React, { useMemo } from "react";
import { Doughnut as Donut } from "react-chartjs-2";
import { Counter, randomHomework } from "shared";
import { useSubjectsQuery } from "../generated/graphql";
import { getSubjectsMap, usedSubjects } from "../lib/subjects";
import { defaults } from "react-chartjs-2";
import { ChartColors } from "../constants/charts";

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
    <div className="stats-page">
      <div className="chart-container" id="subjects-donut-container">
        <Donut
          className="chart"
          data={{
            labels: Object.keys(frequency),
            datasets: [
              {
                label: "Subjects",
                data: Object.values(frequency),
                backgroundColor: ChartColors.backgroundColor,
                borderColor: ChartColors.borderColor,
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                display: true,
                text: "Subjects Breakdown",
                font: {
                  size: "20",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
