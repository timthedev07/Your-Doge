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
export const setWithExpiry = (
  store: Storage,
  key: string,
  value: any,
  validUntil: number
) => {
  const item: ExpiryObject = {
    value: value,
    expiry: validUntil.valueOf(),
  };

  store.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (store: Storage, key: string) => {
  const itemStr = store.getItem(key);
  if (!itemStr) {
    return null;
  }

  const item: ExpiryObject = JSON.parse(itemStr);
  const now = new Date();

  if (!window) return;
  if (now.valueOf() > item.expiry) {
    store.removeItem(key);
    return null;
  }
  return item.value;
};
