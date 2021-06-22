import React from "react";
import { useAllHomeworkQuery } from "../generated/graphql";

export const Home: React.FC = () => {
  const {
    data: gqlData,
    loading: gqlLoading,
    error: gqlError,
  } = useAllHomeworkQuery();
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
  return (
    <div>
      <a href="/new_homework">Add homework</a>
      <br />
      {JSON.stringify(gqlData.getAllHomework)}
    </div>
  );
};
