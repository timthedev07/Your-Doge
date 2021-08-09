import { ParsedUrlQuery } from "querystring";

export const routeQueryProcessor = (query: ParsedUrlQuery, name: string) => {
  const value = query[name];
  return value ? (value as string) : "";
};
