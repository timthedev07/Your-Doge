import "../styles/master.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import { isClient } from "../lib/isClient";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { createTheme, ThemeProvider } from "@material-ui/core";

const App = ({ Component, pageProps }: AppProps) => {
  const [b, setB] = useState<boolean>(false);

  useEffect(() => {
    setB(isClient);
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );

  return b ? (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  ) : (
    <></>
  );
};

export default App;
