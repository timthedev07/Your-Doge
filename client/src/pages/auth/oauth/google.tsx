import React, { useEffect } from "react";
import * as queryString from "query-string";
import { getGoogleUserInfo } from "../../../lib/oauth/google";
import { useGoogleOAuthMutation } from "../../../generated/graphql";

interface GoogleProps {}

const Google: React.FC<GoogleProps> = ({}) => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const [registerGoogleUser] = useGoogleOAuthMutation();

  useEffect(() => {
    if (!code) {
      return;
    }
    const asyncFunc = async () => {
      const response = await getGoogleUserInfo(code);
      registerGoogleUser({ variables: { ...response } });
    };

    asyncFunc();
  }, [code, registerGoogleUser]);

  return (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <div>
          <h2>Please wait while we sign you in/up...</h2>
          <h4>Take a gentle sip of that cappuccino, and chill.</h4>
          <br />
          <br />
          <img src="/images/wait.svg" alt="" style={{ width: "300px" }} />
        </div>
      </div>
    </div>
  );
};

export default Google;
