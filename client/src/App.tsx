import React, { useEffect, useState } from "react";
import { USERS_BACKEND_AUTH_BASE_URL } from "./index";
import { setAccessToken } from "./accessToken";
import { Routes } from "./Routes";
import { Loading } from "./components/Loading";

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${USERS_BACKEND_AUTH_BASE_URL}/refresh_token`, {
      credentials: "include",
      method: "POST",
    })
      .then(async (x) => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  });

  if (loading) {
    return (
      <>
        <Loading />
        <div className="App"></div>
      </>
    );
  }

  return (
    <>
      <Routes />
    </>
  );
};
