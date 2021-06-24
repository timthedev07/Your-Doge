import React, { useEffect, useState } from "react";
import { BACKEND_AUTH_BASE_URL } from ".";
import { setAccessToken } from "./accessToken";
import { Loading } from "./components/Loading";
import { ThemeControl } from "./contexts/ThemeContext";
import { Routes } from "./Routes";

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${BACKEND_AUTH_BASE_URL}/refresh_token`, {
      credentials: "include",
      method: "POST",
    })
      .then(async (x) => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
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
      <ThemeControl>
        <Routes />
      </ThemeControl>
    </>
  );
};
