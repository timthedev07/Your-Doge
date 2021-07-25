import "../styles/master.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import { isClient } from "../lib/isClient";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  const [b, setB] = useState<boolean>(false);

  useEffect(() => {
    setB(isClient);
  }, []);

  return b ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <></>
  );
};

export default App;
