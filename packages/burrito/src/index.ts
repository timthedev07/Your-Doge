import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { HomeworkResolver } from "./Resolvers/HomeworkResolver";
import { FRONTEND, PLAYGROUND } from "shared";

const PORT: number = parseInt(process.env.PORT!) || 5000;
const HOSTNAME: string = process.env.HOST || "0.0.0.0";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND, PLAYGROUND],
    })
  );

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [HomeworkResolver] }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, HOSTNAME, () => {
    console.log(
      `server 'burrito' up and running at http://${HOSTNAME}:${PORT}`
    );
  });
})();
