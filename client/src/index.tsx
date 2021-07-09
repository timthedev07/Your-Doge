import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { App } from "./App";
import { generateApolloClient } from "./utils/clientGenerator";

/* development urls */
export const DEV_USERS_BACKEND = "http://localhost:4000";
export const DEV_GATEWAY_BACKEND = "http://localhost:9000";

export const USERS_BACKEND = "https://homework-manager-users.herokuapp.com";
export const GATEWAY_BACKEND = "https://homework-manager-db0.herokuapp.com";

export const authClient = generateApolloClient(DEV_GATEWAY_BACKEND);

export const unknownErrMsg =
  "Sorry, an unknown error occurred, try again later, or contact our support team(bot.rem.autogenerate@gmail.com)";

ReactDOM.render(
  <ApolloProvider client={authClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
