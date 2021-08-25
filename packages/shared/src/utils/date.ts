export type YyyymmddDateFormat = `${number}-${number}-${number}`;
export const daysElapsed = (dateInMilliseconds: number) => {
  return (new Date().valueOf() - dateInMilliseconds) / (1000 * 60 * 60 * 24);
};

export const daysToMilliseconds = (days: number) => {
  return 1000 * 60 * 60 * 24 * days;
};

export const daysAgo = (days: number) => {
  const d = new Date(Date.now() - daysToMilliseconds(days));
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  return d.valueOf();
};

export const yyyymmdd = (date: Date) => {
  return date.toISOString().split("T")[0] as YyyymmddDateFormat;
};

export const dateCeil = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const dayNumToString = (day: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
  const map: Record<number, string> = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  return map[day];
};
