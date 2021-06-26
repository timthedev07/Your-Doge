import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { App } from "./App";
import { generateApolloClient } from "./utils/clientGenerator";

export const USERS_BACKEND_BASE_URL =
  // "https://homework-manager-users.herokuapp.com";
  "http://localhost:4000";
export const USERS_BACKEND_AUTH_BASE_URL = `${USERS_BACKEND_BASE_URL}/auth`;

// export const BACKEND_BASE_URL = "https://homework-manager-db0.herokuapp.com";
// export const BACKEND_AUTH_BASE_URL = `${BACKEND_BASE_URL}/auth`;

export const authClient = generateApolloClient(
  USERS_BACKEND_BASE_URL,
  USERS_BACKEND_AUTH_BASE_URL
);

ReactDOM.render(
  <ApolloProvider client={authClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
