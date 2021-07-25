import Head from "next/head";
import { useMeQuery } from "../generated/graphql";

const Home = () => {
  const { data } = useMeQuery();

  return (
    <div>
      <Head>
        <title>I override everything</title>
      </Head>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
