export const Counter = (array: (string | number | symbol)[]) => {
  const count: Record<string | number | symbol, number> = {};
  array.forEach((val) => (count[val] = (count[val] || 0) + 1));
  return count;
};
