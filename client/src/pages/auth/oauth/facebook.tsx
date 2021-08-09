import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { OAuthWait } from "../../../components/OAuthWait";
import queryString from "query-string";
import axios from "axios";
import {
  MeDocument,
  MeQuery,
  useFacebookOAuthMutationMutation,
} from "../../../generated/graphql";
import { parseGraphQLError } from "../../../lib/graphqlErrorParser";

const Facebook: React.FC = ({}) => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const { push } = useRouter();
  const [active, setActive] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [registerFacebookUser] = useFacebookOAuthMutationMutation();

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
        const { data: userData } = await axios({
          url: "/api/auth/oauth/facebook",
          method: "POST",
          data: {
            code,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response = await registerFacebookUser({
          variables: { ...userData },
          update: (store, { data }) => {
            if (!data) return null;
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data.facebookOAuth.user,
              },
            });
            return null;
          },
        });

        if (response.data?.facebookOAuth.status === "logged-in") {
          push("/dashboard");
        }
      } catch (err: any) {
        displayError(parseGraphQLError(err));
      }
    };

    asyncFunc();
  }, [code, push, registerFacebookUser]);

  return (
    <OAuthWait
      active={active}
      setActive={setActive}
      alertMessage={alertMessage}
    />
  );
};

export default Facebook;
