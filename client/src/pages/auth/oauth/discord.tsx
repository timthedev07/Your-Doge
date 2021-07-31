import React, { useEffect } from "react";
import * as queryString from "query-string";
import axios from "axios";
import {
  MeDocument,
  MeQuery,
  useDiscordOAuthMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";

const Discord: React.FC = () => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const [registerDiscordUser] = useDiscordOAuthMutation();
  const { push } = useRouter();

  useEffect(() => {
    const asyncFunc = async () => {
      if (!code) {
        return;
      }

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
      }
    };

    asyncFunc();
  }, [code, registerDiscordUser, push]);

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
