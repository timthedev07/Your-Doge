import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const NotFound: React.FC = () => {
  const { back } = useRouter();

  return (
    <div id="not-found-page">
      <Head>
        <title>404 | Your Doge</title>
      </Head>
      <div className="not-found-content">
        <h1>
          4
          <img src="/images/yellingDoge0.png" alt="" />4
        </h1>
        <h3>The page you were looking for was not found.</h3>
        <button
          onClick={() => {
            back();
          }}
          className="animated-btn"
        >
          Go Back
        </button>
      </div>
      <img id="not-found-bg" alt="404" src="/images/404.jpeg" />
    </div>
  );
};

export default NotFound;
