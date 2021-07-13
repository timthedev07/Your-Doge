import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { App } from "./App";
import { generateApolloClient } from "./utils/clientGenerator";

/* development urls */
export const BACKEND =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:9000"
    : "https://homework-manager-primary.herokuapp.com";

export const authClient = generateApolloClient(BACKEND);

export const unknownErrMsg =
  "Sorry, an unknown error occurred, try again later, or contact our support team(yourdoge.team@gmail.com)";

ReactDOM.render(
  <ApolloProvider client={authClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
