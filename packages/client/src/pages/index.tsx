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
            <br />
            <br />
            <p>
              Your Doge is an online doge themed homework manager empowered by a
              supportive team and innovative technologies.
              <br />
              Filter, sort, and target homework based on your needs. And, more
              importantly, visualizing statistics has never been easier for you.
            </p>
          </div>
        </header>
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
