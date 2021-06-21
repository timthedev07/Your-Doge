import React from "react";
import { useMeQuery } from "../generated/graphql";

export const Home: React.FC = () => {
  const { data: gqlData, loading: gqlLoading, error: gqlError } = useMeQuery();
  if (gqlError) {
    console.log(gqlError);
    return <div>error...</div>;
  }
  if (gqlLoading) {
    return <div>Loading...</div>;
  }
  if (!gqlData) {
    return <div>No data</div>;
  }
  return <div>{JSON.stringify(gqlData.me)}</div>;
};
