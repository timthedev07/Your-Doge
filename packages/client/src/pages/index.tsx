import { GetStaticProps } from "next";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home | Your Doge</title>
      </Head>
      <h3>Landing Page - TODO</h3>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
