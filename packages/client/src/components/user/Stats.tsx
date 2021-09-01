import React, { useMemo, useState } from "react";
import { Doughnut as Donut, defaults, Line, Radar } from "react-chartjs-2";
import {
  Counter,
  daysToMilliseconds,
  groupArray,
  randomHomework,
} from "shared";
import { useSubjectsQuery } from "../../generated/graphql";
import { getSubjectsMap, usedSubjects } from "../../lib/subjects";
import { ChartColors } from "../../constants/charts";
import { Homework } from "../../generated/sub-graphql";

defaults.color = "white";
defaults.borderColor = "white";

const CHART_TITLE_SIZE = 20;

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const donutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Subjects Breakdown",
      font: {
        size: CHART_TITLE_SIZE,
      },
    },
  },
};

const radarOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scale: {
    ticks: {
      maxTicksLimit: 2,
      callback: () => {},
    },
  },
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      ticks: {
        backdropColor: "rgba(0, 0, 0, 0)",
        font: {
          size: 0,
        },
      },
    },
  },
};

const lineChartOptions = {
  scales: {
    y: {
      ticks: {
        callback: (value: number) => {
          if (Math.floor(value) === value) return value;
        },
      },
      title: {
        display: true,
        text: "Homework Count",
      },
    },
    x: {
      title: {
        display: true,
        text: "Days",
      },
    },
  },
  plugins: {
    title: {
      position: "top",
      display: true,
      text: "Homework Distribution",
      font: {
        size: CHART_TITLE_SIZE,
      },
    },
  },
};

export const Stats: React.FC = () => {
  const homeworkList = useMemo(() => randomHomework(1000), []);
  const { data: subjectsData, loading: subjectsLoading } = useSubjectsQuery();
  const [selectedRange, setSelectedRange] = useState<string>("week");
  const [filtered, setFiltered] = useState<Homework[]>(
    homeworkList.filter(
      (each) => each.deadline > Date.now() - daysToMilliseconds(7)
    )
  );

  const subjectsMap: Record<number, string> | undefined = useMemo(() => {
    return getSubjectsMap(subjectsData);
  }, [subjectsData]);

  const frequency = useMemo(() => {
    return Counter(usedSubjects(filtered, subjectsMap, false));
  }, [filtered, subjectsMap]);

  const groupedByDeadline = useMemo(() => {
    const map = groupArray(
      filtered,
      "deadline",
      (val) => {
        return new Date(val as number).getDay();
      },
      DAYS
    );
    return Array.from(map.entries()).sort();
  }, [filtered]);

  const groupedBySubject = useMemo(() => {
    const map = groupArray(filtered, "subjectId");
    return Array.from(map.entries()).sort();
  }, [filtered]);

  const data = {
    labels: DAYS,
    datasets: [
      {
        label: "Homework Count on This Day",
        data: groupedByDeadline.map((each) => each[1].length),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };

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
            options={donutOptions}
          />
        </div>
        <div className="chart-container" id="homework-status-donut-container">
          <Radar
            className="chart"
            data={{
              labels: [
                "Thing 1",
                "Thing 2",
                "Thing 3",
                "Thing 4",
                "Thing 5",
                "Thing 6",
              ],
              datasets: [
                {
                  label: "",
                  data: [2, 9, 3, 5, 2, 3],
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={radarOptions}
          />
        </div>

        <div
          className="chart-container"
          id="weekly-homework-line-chart-container"
        >
          <Line data={data} options={lineChartOptions} />
        </div>
      </div>
    </>
  );
};
