import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./Resolvers/UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import the routes
import { router as AuthRouter } from "./routes/AuthRoute";
import { HomeworkResolver } from "./Resolvers/HomeworkResolver";

const PORT: string = process.env.PORT || "4000";
const FRONTEND_URL = "http://localhost:3000";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URL,
    })
  );

  // use the routes
  app.use("/auth", AuthRouter);

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:
        // decides whether or not a server handles homework data
        process.env.HANDLE_HOMEWORK! === "true"
          ? [UserResolver, HomeworkResolver]
          : [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`app listening at: http://localhost:${PORT}`);
  });
})();
