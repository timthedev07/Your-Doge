import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { getAccessToken, setAccessToken } from "./accessToken";
import { App } from "./App";
import {
  ApolloClient,
  InMemoryCache,
  Observable,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";

export const BACKEND_BASE_URL = "https://homework-manager-db0.herokuapp.com";
export const BACKEND_AUTH_BASE_URL = `${BACKEND_BASE_URL}/auth`;

export const USERS_BACKEND_BASE_URL =
  "https://homework-manager-users.herokuapp.com";
export const USERS_BACKEND_AUTH_BASE_URL = `${BACKEND_BASE_URL}/auth`;

const cache = new InMemoryCache({
  typePolicies: {
    Homework: {
      keyFields: ["id", "title", "description", "deadline"],
    },
  },
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
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

export const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode<JwtPayload>(token);
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
        return fetch(`${USERS_BACKEND_AUTH_BASE_URL}/refresh_token`, {
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
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }) as any,
    requestLink,
    new HttpLink({
      uri: `${USERS_BACKEND_BASE_URL}/graphql`,
      credentials: "include",
    }),
  ]),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
