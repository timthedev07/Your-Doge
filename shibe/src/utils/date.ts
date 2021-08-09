export const daysElapsed = (dateInMilliseconds: number) => {
  return (new Date().valueOf() - dateInMilliseconds) / (1000 * 60 * 60 * 24);
};
