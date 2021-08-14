export const daysElapsed = (dateInMilliseconds: number) => {
  return (new Date().valueOf() - dateInMilliseconds) / (1000 * 60 * 60 * 24);
};

export const daysToMilliseconds = (days: number) => {
  return 1000 * 60 * 60 * 24 * days;
};
