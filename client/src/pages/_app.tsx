import "../styles/master.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { BACKEND } from "../constants/apollo";
import { generateApolloClient } from "../lib/clientGenerator";
import { getWithExpiry } from "../lib/localStorageExpiration";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import { Nav } from "../components/nav/Nav";
import { isClient } from "../lib/isClient";

export const shibe = generateApolloClient(BACKEND);
export const SERVER_ID = isClient
  ? getWithExpiry(window.localStorage, "serverId")
  : -1;

export const burrito: ApolloClient<NormalizedCacheObject> =
  generateApolloClient(
    `${
      process.env.NODE_ENV === "development"
        ? `http://localhost:500${SERVER_ID}`
        : `http://homework-manager-db${SERVER_ID}.herokuapp.com`
    }`
  );

const App = ({ Component, pageProps }: AppProps) => {
  if (!isClient) {
    return null;
  }
  return (
    <div className="App">
      <Head>
        <title>Your Doge</title>
      </Head>
      <nav>
        <Nav transparent={false} />
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
};

const ApolloWrapper: React.FC<AppProps> = (props) => {
  if (SERVER_ID) {
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
