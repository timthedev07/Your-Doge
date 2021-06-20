import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";

// Import the routes
import { router as AuthRouter } from "./routes/AuthRoute";

// specify the routes
const PORT: number = 8000;

// use the routes

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use("/auth", AuthRouter);

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`app listening at: ${PORT}`);
  });
})();
