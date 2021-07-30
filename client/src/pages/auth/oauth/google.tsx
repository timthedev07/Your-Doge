import React, { useEffect } from "react";
import * as queryString from "query-string";
import { useGoogleOAuthMutation } from "../../../generated/graphql";
import { useRouter } from "next/router";
import axios from "axios";

const Google: React.FC = () => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const [registerGoogleUser] = useGoogleOAuthMutation();
  const { push } = useRouter();

  useEffect(() => {
    const asyncFunc = async () => {
      if (!code) {
        return;
      }

      const { data } = await axios({
        url: "/api/auth/oauth/google",
        method: "POST",
        data: {
          code,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await registerGoogleUser({ variables: { ...data } });
      if (res.data?.googleOAuth.status === "logged-in") {
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
