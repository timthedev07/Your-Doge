import React, { useMemo, useState } from "react";
import { Doughnut as Donut, defaults, Line } from "react-chartjs-2";
import { Counter, daysToMilliseconds, randomHomework } from "shared";
import { useSubjectsQuery } from "../../generated/graphql";
import { getSubjectsMap, usedSubjects } from "../../lib/subjects";
import { ChartColors } from "../../constants/charts";
import { Homework } from "../../generated/sub-graphql";

defaults.color = "white";

const data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const Stats: React.FC = () => {
  const homeworkList = useMemo(() => randomHomework(5000), []);
  const { data: subjectsData } = useSubjectsQuery();
  const [selectedRange, setSelectedRange] = useState<string>("week");
  const [filtered, setFiltered] = useState<Homework[]>(homeworkList);

  const subjectsMap: Record<number, string> | undefined = useMemo(() => {
    return getSubjectsMap(subjectsData);
  }, [subjectsData]);

  const frequency = useMemo(() => {
    return Counter(usedSubjects(filtered, subjectsMap, false));
  }, [filtered, subjectsMap]);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;

    let breakpoint: number;

    const now = Date.now();

    switch (val) {
      case "week": {
        breakpoint = now - daysToMilliseconds(7);
        break;
      }
      case "month": {
        breakpoint = now - daysToMilliseconds(30);
        break;
      }
      case "three-months": {
        breakpoint = now - daysToMilliseconds(92);
        break;
      }
      default: {
        breakpoint = 0;
      }
    }

    setSelectedRange(val);
    setFiltered(homeworkList.filter((each) => each.deadline > breakpoint));
  };

  return (
    <>
      <select
        value={selectedRange}
        onChange={handleTimeRangeChange}
        className="time-range-select"
      >
        <option value="week">Past week</option>
        <option value="month">Past month</option>
        <option value="three-months">Past three months</option>
        <option value="">All time</option>
      </select>

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

        <div
          className="chart-container"
          id="weekly-homework-line-chart-container"
        >
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};
