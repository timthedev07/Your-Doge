import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import { getGoogleUserInfo } from "../../../lib/oauth/google";

interface GoogleProps {}

const Google: React.FC<GoogleProps> = ({}) => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const [data, setData] = useState({});

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await getGoogleUserInfo(code);
      setData(response);
    };

    asyncFunc();
  }, [code]);

  return (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <h2>Please wait until while we sign you in/up.</h2>
        <img src="/images/wait.svg" alt="" style={{ width: "300px" }} />
      </div>
    </div>
  );
};

export default Google;
