import { GetStaticProps } from "next";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home | Your Doge</title>
      </Head>
      <div className="landing-page">
        <header>
          <img
            className="landing-header-image"
            src="/images/landing-header.png"
            alt=""
          />
        </header>
        <section></section>
        <section></section>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
