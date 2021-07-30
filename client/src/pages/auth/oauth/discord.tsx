import React, { useEffect } from "react";
import * as queryString from "query-string";
import { useRouter } from "next/router";

const Discord: React.FC = () => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const { push } = useRouter();

  useEffect(() => {
    const asyncFunc = async () => {};

    if (1 < 1) {
      push("/");
    }

    asyncFunc();
  });

  return (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <div>
          <h2>You are almost there...</h2>
          <h4>Please wait while we sign you in/up...</h4>
          <img src="/images/wait.svg" alt="" style={{ width: "200px" }} />
        </div>
      </div>
    </div>
  );
};

export default Discord;
