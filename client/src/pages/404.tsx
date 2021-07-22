import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import Bg from "../../public/images/404.jpeg";

const NotFound: React.FC = () => {
  const { back } = useRouter();

  return (
    <div id="not-found-page">
      <Head>
        <title>404</title>
      </Head>
      <div className="not-found-content">
        <h1>
          4
          <Image
            src="/images/yellingDoge0.png"
            alt=""
            height={400}
            width={400}
            priority
          />
          4
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
      <Image id="not-found-bg" alt="404bg" src={Bg} priority />
    </div>
  );
};

export default NotFound;
