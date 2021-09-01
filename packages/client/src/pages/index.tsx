import { GetStaticProps } from "next";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home | Your Doge</title>
      </Head>
      <div className="landing-page">
        <header className="landing-header">
          <img
            className="landing-header-image"
            src="/images/landing-header2.png"
            alt=""
          />
          <div className="landing-header-caption">
            <h2>Your time is valuable,</h2>
            <h4>and we are here to save it.</h4>
          </div>
        </header>
        <img src="/images/icons/down-arrow.svg" alt="" />
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
