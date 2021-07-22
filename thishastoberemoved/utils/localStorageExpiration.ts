interface ExpiryObject {
  value: any;
  expiry: number;
}
/**
 *
 * @param key They key that maps to the value
 * @param value The actual value
 * @param validUntil A date
 */
export const setWithExpiry = (key: string, value: any, validUntil: number) => {
  const item: ExpiryObject = {
    value: value,
    expiry: validUntil.valueOf(),
  };

  window.localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key: string) => {
  const itemStr = window.localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

  const item: ExpiryObject = JSON.parse(itemStr);
  const now = new Date();

  if (now.valueOf() > item.expiry) {
    window.localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
