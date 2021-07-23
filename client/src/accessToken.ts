export let accessToken = "";

console.log(accessToken);

export const setAccessToken = (s: string) => {
  accessToken = s;
  console.log(accessToken);
};
export const getAccessToken = () => {
  console.log(accessToken);
  return accessToken;
};
