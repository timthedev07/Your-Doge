import Head from "next/head";
import { useMeQuery } from "../generated/graphql";

const Home = () => {
  const { data } = useMeQuery();

  return (
    <div>
      <Head>
        <title>I override everything</title>
      </Head>
      {JSON.stringify(data)}
    </div>
  );
};

export default Home;
