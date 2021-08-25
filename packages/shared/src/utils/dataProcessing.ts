/**
 * Group a list of objects by a given key.
 * @param data A list of objects of type T
 * @param key The key you want you data to be grouped by
 * @param valueTransform Optional function that will transform the value indexed by the given key to some other format or type, the return value of this function would be the keys in the returned map.
 * @returns A map containing the grouped data
 */
export const groupArray = <T extends {}>(
  data: T[],
  key: keyof T,
  valueTransform: (val: T[typeof key]) => any = (val: any) => val,
  expectedMapKeys: T[keyof T][]
) => {
  const res: Map<T[keyof T], T[]> = new Map();

  for (const item of data) {
    const transformedValue = valueTransform(item[key]);
    if (res.has(transformedValue)) {
      res.get(transformedValue)!.push(item);
    } else {
      res.set(transformedValue, [item]);
    }
  }

  for (const expectedKey of expectedMapKeys) {
    if (!res.has(expectedKey)) {
      res.set(expectedKey, []);
    }
  }

  return res;
};
