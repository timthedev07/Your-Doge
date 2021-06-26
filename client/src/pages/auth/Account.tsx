import React from "react";
import { useMeQuery } from "../../generated/graphql";

interface AccountProps {}

export const Account: React.FC<AccountProps> = () => {
  let body;

  const { data } = useMeQuery();

  console.log(data);

  if (data && data.me) {
    body = JSON.stringify(data.me);
  } else {
    body = "Not Logged In";
  }

  return (
    <div>
      <div>{body}</div>
    </div>
  );
};
