import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

import { ApolloProvider } from "@apollo/react-hooks";

const APOLLO_BACKEND = "http://localhost:4000/graphql";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: APOLLO_BACKEND,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
