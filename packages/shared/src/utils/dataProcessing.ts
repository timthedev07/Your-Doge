/**
 * Group a list of objects by a given key.
 * @param data A list of objects of type T
 * @param key The key you want you data to be grouped by
 * @returns A map containing the grouped data
 */
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
