import "../styles/master.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import { Nav } from "../components/nav/Nav";
import { isClient } from "../lib/isClient";
import React, { useEffect, useState } from "react";
import { CustomApolloProvider } from "../contexts/ApolloContext";

const App = ({ Component, pageProps }: AppProps) => {
  const [b, setB] = useState<boolean>(false);

  useEffect(() => {
    setB(isClient);
  }, []);

  return b ? (
    <CustomApolloProvider>
      <>
        <Nav transparent={false} />
        <div className="App">
          <Head>
            <title>Your Doge</title>
            <meta
              name="description"
              content="An awesome doge themed homework manager."
            />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Your Doge Home" />
            <meta
              property="og:description"
              content="An awesome doge themed homework manager."
            />
            <meta property="og:site_name" content="Your Doge" />
          </Head>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </>
    </CustomApolloProvider>
  ) : (
    <></>
  );
};

export default App;
