import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import { getGoogleUserInfo } from "../../../lib/google";

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
    <div>
      <pre>{JSON.stringify(data, null, 10)}</pre>
    </div>
  );
};

export default Google;
