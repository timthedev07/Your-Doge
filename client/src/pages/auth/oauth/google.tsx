import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import {
  MeDocument,
  MeQuery,
  useGoogleOAuthMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import axios from "axios";
import { unknownErrMsg } from "../../../constants/general";
import { OAuthWait } from "../../../components/OAuthWait";

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
        try {
          displayError(err.graphQLErrors[0].message);
        } catch (err) {
          displayError(unknownErrMsg);
        }
      }
    };

    asyncFunc();
  }, [code, registerGoogleUser, push]);

  return (
    <OAuthWait
      active={active}
      setActive={setActive}
      alertMessage={alertMessage}
    />
  );
};

export default Google;
