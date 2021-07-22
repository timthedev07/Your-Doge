import "../styles/master.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { BACKEND } from "../constants/apollo";
import { generateApolloClient } from "../lib/clientGenerator";
import { getWithExpiry } from "../lib/localStorageExpiration";
import { useEffect, useState } from "react";

let SERVER_ID = null;

export const shibe = generateApolloClient(BACKEND);
export const burrito = generateApolloClient(
  `${
    process.env.NODE_ENV === "development"
      ? `http://localhost:500${SERVER_ID}`
      : `http://homework-manager-db${SERVER_ID}.herokuapp.com`
  }`
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="App">
      <Head>
        <title>Your Doge</title>
      </Head>
      <nav></nav>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
};

const ApolloWrapper: React.FC<AppProps> = (props) => {
  const [serverId, setServerId] = useState(0);

  useEffect(() => {
    setServerId(getWithExpiry(window.localStorage, "serverId") - 1);
  }, []);

  if (serverId) {
    return (
      <ApolloProvider client={burrito}>
        <ApolloProvider client={shibe}>
          <App {...props} />
        </ApolloProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={shibe}>
      <App {...props} />
    </ApolloProvider>
  );
};

export default ApolloWrapper;
