import React, { useEffect } from "react";
import * as queryString from "query-string";
import { getGoogleUserInfo } from "../../../lib/oauth/google";
import { useGoogleOAuthMutation } from "../../../generated/graphql";
import { useRouter } from "next/router";

const Google: React.FC = ({}) => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const [registerGoogleUser] = useGoogleOAuthMutation();
  const { push } = useRouter();

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await getGoogleUserInfo(code);
      const res = await registerGoogleUser({ variables: { ...response } });
      if (res.data?.googleOAuth) {
        push("/dashboard");
      }
    };

    asyncFunc();
  }, [code, registerGoogleUser, push]);

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

export default Google;
