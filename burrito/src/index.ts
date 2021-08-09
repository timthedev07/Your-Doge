import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { HomeworkResolver } from "./Resolvers/HomeworkResolver";

const PORT: number = parseInt(process.env.PORT!) || 4000;
const HOSTNAME: string = process.env.HOST || "0.0.0.0";

export const FRONTEND =
  process.env.NODE_ENV === "production"
    ? "https://yourdoge.vercel.app"
    : "http://localhost:3000";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND],
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
