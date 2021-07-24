import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { BACKEND } from "../constants/apollo";
import { generateApolloClient } from "../lib/clientGenerator";
import { isClient } from "../lib/isClient";
import { getWithExpiry } from "../lib/localStorageExpiration";
import { AuthProvider, ContextProps } from "./AuthContext";

export const SERVER_ID = isClient
  ? getWithExpiry(window.localStorage, "serverId")
  : -1;

interface ApolloContextType {
  getAccessToken: () => string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  shibe: ApolloClient<NormalizedCacheObject>;
  burrito: ApolloClient<NormalizedCacheObject>;
}

const ApolloContext = React.createContext<ApolloContextType | null>(null);

export const useApollo = () => {
  return useContext(ApolloContext);
};

export const CustomApolloProvider: React.FC<ContextProps> = ({ children }) => {
  // global states
  const [accessToken, setAccessToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // use effect hooks
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
      .catch(() => {
        setLoading(false);
      });
  });

  if (loading) {
    return <Loading />;
  }

  // static functions and client instances
  const getAccessToken = () => accessToken;

  const shibe = generateApolloClient(BACKEND, getAccessToken, setAccessToken);
  const burrito = generateApolloClient(
    `${
      process.env.NODE_ENV === "development"
        ? `http://localhost:500${SERVER_ID}`
        : `http://homework-manager-db${SERVER_ID}.herokuapp.com`
    }`,
    getAccessToken,
    setAccessToken
  );

  const value = {
    getAccessToken,
    setAccessToken,
    shibe,
    burrito,
  };

  return (
    <ApolloProvider client={burrito}>
      <ApolloProvider client={shibe}>
        <ApolloContext.Provider value={value}>
          <AuthProvider>{children}</AuthProvider>
        </ApolloContext.Provider>
      </ApolloProvider>
    </ApolloProvider>
  );
};
