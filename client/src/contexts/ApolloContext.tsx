import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { BACKEND } from "../constants/apollo";
import { isClient } from "../lib/isClient";
import { getWithExpiry } from "../lib/localStorageExpiration";
import { AuthProvider, ContextProps } from "./AuthContext";
import { Observable, ApolloLink, HttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { InMemoryCache } from "@apollo/client";

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

  const generateApolloClient = (baseUrl: string) => {
    const cache = new InMemoryCache({});
    const requestLink = new ApolloLink(
      (operation, forward) =>
        new Observable((observer) => {
          let handle: any;
          Promise.resolve(operation)
            .then((operation) => {
              if (accessToken) {
                console.log("THERE IS A TOKEN");
                operation.setContext({
                  headers: {
                    authorization: `bearer ${accessToken}`,
                  },
                });
              }
            })
            .then(() => {
              handle = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch(observer.error.bind(observer));

          return () => {
            if (handle) handle.unsubscribe();
          };
        })
    );

    const client = new ApolloClient({
      link: ApolloLink.from([
        new TokenRefreshLink({
          accessTokenField: "accessToken",
          isTokenValidOrUndefined: () => {
            if (!accessToken) {
              return true;
            }

            try {
              const { exp } = jwtDecode<JwtPayload>(accessToken);
              if (Date.now() >= exp! * 1000) {
                return false;
              } else {
                return true;
              }
            } catch {
              return false;
            }
          },
          fetchAccessToken: () => {
            return fetch(`${baseUrl}/auth/refresh_token`, {
              method: "POST",
              credentials: "include",
            });
          },
          handleFetch: (accessToken) => {
            setAccessToken(accessToken);
          },
          handleError: (err) => {
            console.warn("Your refresh token is invalid. Try to relogin");
            console.error(err);
          },
        }),
        onError(() => {}) as any,
        requestLink,
        new HttpLink({
          uri: `${baseUrl}/graphql`,
          credentials: "include",
        }),
      ]),
      cache,
    });

    return client;
  };

  // static functions and client instances
  const getAccessToken = () => accessToken;

  const shibe = generateApolloClient(BACKEND);
  const burrito = generateApolloClient(
    `${
      process.env.NODE_ENV === "development"
        ? `http://localhost:500${SERVER_ID}`
        : `http://homework-manager-db${SERVER_ID}.herokuapp.com`
    }`
  );

  const value = {
    getAccessToken,
    setAccessToken,
    shibe,
    burrito,
  };

  return (
    <>
      {loading && <Loading />}
      <ApolloProvider client={burrito}>
        <ApolloProvider client={shibe}>
          <ApolloContext.Provider value={value}>
            <AuthProvider>{children}</AuthProvider>
          </ApolloContext.Provider>
        </ApolloProvider>
      </ApolloProvider>
    </>
  );
};
