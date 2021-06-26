import React, { useEffect } from "react";
import { BACKEND_AUTH_BASE_URL } from ".";
import { setAccessToken } from "./accessToken";
import { ThemeControl } from "./contexts/ThemeContext";
import { Routes } from "./Routes";

interface Props {}

export const App: React.FC<Props> = () => {
  // useEffect(() => {
  //   fetch(`${BACKEND_AUTH_BASE_URL}/refresh_token`, {
  //     credentials: "include",
  //     method: "POST",
  //   })
  //     .then(async (x) => {
  //       const { accessToken } = await x.json();
  //       setAccessToken(accessToken);
  //     })
  //     .catch((err) => {});
  // }, []);

  return (
    <>
      <ThemeControl>
        <Routes />
      </ThemeControl>
    </>
  );
};
