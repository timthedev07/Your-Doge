export const groupArray = <T extends {}>(data: T[], key: keyof T) => {
  const res: Map<T[keyof T], T[]> = new Map();

  for (const item of data) {
    if (res.has(item[key])) {
      res.get(item[key])!.push(item);
    } else {
      res.set(item[key], [item]);
    }
  }

  return res;
};
