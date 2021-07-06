import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { App } from "./App";
import { generateApolloClient } from "./utils/clientGenerator";

export const DEV_BACKEND_BASE_URL = "http://localhost:4000";
export const USERS_BACKEND_BASE_URL =
  "https://homework-manager-users.herokuapp.com";
export const BACKEND_BASE_URL = "https://homework-manager-db0.herokuapp.com";
export const MIDDLEWARE_URL = "http://localhost:5000";

export const authClient = generateApolloClient(DEV_BACKEND_BASE_URL);
export const middlewareClient = generateApolloClient(MIDDLEWARE_URL);

export const unknownErrMsg =
  "Sorry, an unknown error occurred, try again later, or contact our support team(bot.rem.autogenerate@gmail.com)";

ReactDOM.render(
  // <ApolloProvider client={middlewareClient}>
  <ApolloProvider client={authClient}>
    <App />
  </ApolloProvider>,
  // </ApolloProvider>,
  document.getElementById("root")
);
