import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { OAuthWait } from "../../../components/OAuthWait";
import queryString from "query-string";
import axios from "axios";
import { unknownErrMsg } from "../../../constants/general";

const Facebook: React.FC = ({}) => {
  const urlParams = queryString.parse(window.location.search);
  let code = urlParams.code as string;
  const {} = useRouter();
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
          url: "/api/auth/oauth/facebook",
          method: "POST",
          data: {
            code,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err: any) {
        try {
          displayError(err.graphQLErrors[0].message);
        } catch (err) {
          displayError(unknownErrMsg);
        }
      }
    };

    asyncFunc();
  });

  return (
    <OAuthWait
      active={active}
      setActive={setActive}
      alertMessage={alertMessage}
    />
  );
};

export default Facebook;
