import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/UserResolver";
import { buildSchema } from "type-graphql";

export const FRONTEND =
  process.env.NODE_ENV === "production"
    ? "https://your-doge.netlify.app"
    : "http://localhost:3000";

const PORT = parseInt(process.env.PORT || "9000");
const HOSTNAME = process.env.HOST || "localhost";

(async () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND],
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, HOSTNAME, () => {
    console.log(`gateway up and running at http://${HOSTNAME}:${PORT}`);
  });
})();
