import Head from "next/head";
import React from "react";
import { CustomApolloProvider } from "../contexts/ApolloContext";
import { Nav } from "./nav/Nav";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
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

      <div className="screen-cover"></div>

      <CustomApolloProvider>
        <Nav transparent={false} />
        <div className="App">{children}</div>
      </CustomApolloProvider>
    </>
  );
};
