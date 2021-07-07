import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ServerResolver } from "./resolvers/ServerResolver";

const FRONTEND = "https://your-doge.netlify.app";
const DEV_FRONTEND = "http://localhost:3000";

const PORT = parseInt(process.env.PORT || "5000");
const HOSTNAME = process.env.HOST || "localhost";

(async () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [
        // process.env.NODE_ENV === "production" ? FRONTEND_URL : DEV_FRONTEND,
        FRONTEND,
        DEV_FRONTEND,
      ],
    })
  );

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ServerResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, HOSTNAME, () => {
    console.log(`server up and running at http://${HOSTNAME}:${PORT}`);
  });
})();
