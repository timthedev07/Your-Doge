import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import axios from "axios";
import {
  MeDocument,
  MeQuery,
  useDiscordOAuthMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import { unknownErrMsg } from "../../../constants/general";
import { Alert } from "../../../components/Alert";

const Discord: React.FC = () => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const [registerDiscordUser] = useDiscordOAuthMutation();
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
          url: "/api/auth/oauth/discord",
          method: "POST",
          data: {
            code,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await registerDiscordUser({
          variables: data,
          update: (store, { data }) => {
            if (!data) return null;
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data.discordOAuth.user,
              },
            });
            return null;
          },
        });

        if (res.data?.discordOAuth.status === "logged-in") {
          push("/dashboard");
        } else {
          displayError(unknownErrMsg);
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
  }, [code, registerDiscordUser, push]);

  return (
    <>
      <Alert
        setActive={setActive}
        active={active}
        type="warning"
        text={alertMessage}
        onClose={() => push("/auth/login")}
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

export default Discord;
