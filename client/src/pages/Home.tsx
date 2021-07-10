import React from "react";
import { useAllHomeworkQuery } from "../generated/graphql";

export const Home: React.FC = () => {
  let body;

  const {
    data: gqlData,
    loading: gqlLoading,
    error: gqlError,
  } = useAllHomeworkQuery();

  if (gqlError) {
    console.log(gqlError);
    body = <div>Not logged in or server is down</div>;
  } else if (gqlLoading) {
    body = <div>Loading...</div>;
  } else if (!gqlData) {
    body = <div>Oops, No data</div>;
  } else {
    const processedData = gqlData.getAllHomework
      ? gqlData.getAllHomework.map((each) => (
          <div key={each.id}>
            {each.title}, {each.userId}
          </div>
        ))
      : "No data";
    body = processedData;
  }

  return (
    <div>
      <a href="/new_homework">Add homework</a>
      <br />
      {body}
    </div>
  );
};
