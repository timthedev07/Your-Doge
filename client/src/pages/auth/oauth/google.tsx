import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import {
  MeDocument,
  MeQuery,
  useGoogleOAuthMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import axios from "axios";
import { Alert } from "../../../components/Alert";
import { unknownErrMsg } from "../../../constants/general";

const Google: React.FC = () => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const [registerGoogleUser] = useGoogleOAuthMutation();
  const { push } = useRouter();
  const [active, setActive] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const displayError = (message: string) => {
    setActive(true);
    setAlertMessage(message);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      if (!code) {
        return;
      }
      try {
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

        const res = await registerGoogleUser({
          variables: { ...data },
          update: (store, { data }) => {
            if (!data) return null;
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data.googleOAuth.user,
              },
            });
            return null;
          },
        });

        if (res.data?.googleOAuth.status === "logged-in") {
          push("/dashboard");
        }
      } catch (err: any) {
        if (err?.graphQLErrors[0]?.message) {
          displayError(err.graphQLErrors[0].message);
        } else {
          displayError(unknownErrMsg);
        }
      }
    };

    asyncFunc();
  }, [code, registerGoogleUser, push]);

  return (
    <>
      <Alert
        setActive={setActive}
        active={active}
        type="warning"
        text={alertMessage}
      />
      <div className="email-confirmation">
        <div className="email-confirmation-card">
          <div>
            <h2>You are almost there...</h2>
            <h4>Please wait while we sign you in/up...</h4>
            <img src="/images/wait.svg" alt="" style={{ width: "200px" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Google;
