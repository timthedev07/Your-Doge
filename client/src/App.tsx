import React, { useEffect, useState } from "react";
import { BACKEND } from "./constants/apollo";
import { setAccessToken } from "./accessToken";
import { Routes } from "./Routes";
import { Loading } from "./components/Loading";

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${BACKEND}/auth/refresh_token`, {
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
