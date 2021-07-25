import Head from "next/head";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth()!;

  return (
    <div>
      <Head>
        <title>Home | Your Doge</title>
      </Head>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
};

export default Home;
