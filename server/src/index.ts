import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "./utils/buildFederatedSchema";
import { UserResolver } from "./Resolvers/UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

// Import the routes
import { router as AuthRouter } from "./routes/AuthRoute";
import { HomeworkResolver } from "./Resolvers/HomeworkResolver";
import connectRedis from "connect-redis";
import { redisClient } from "./redis";
import { Homework } from "./entity/Homework";
import { User } from "./entity/User";

const PORT: number = parseInt(process.env.PORT!) || 4000;
const HOSTNAME: string = process.env.HOST || "0.0.0.0";
export const FRONTEND_URL = "https://yourdoge.netlify.app";
export const DEV_FRONTEND = "http://localhost:3000";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [
        // process.env.NODE_ENV === "production" ? FRONTEND_URL : DEV_FRONTEND,
        FRONTEND_URL,
        DEV_FRONTEND,
      ],
    })
  );

  if (process.env.HANDLE_HOMEWORK === "false") {
    const RedisStore = connectRedis(session);

    app.use(
      session({
        store: new RedisStore({
          client: redisClient,
        }),
        name: "angularsucks",
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
      })
    );
  }

  // use the routes
  app.use("/auth", AuthRouter);

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildFederatedSchema({
      resolvers:
        process.env.HANDLE_HOMEWORK === "true"
          ? [UserResolver, HomeworkResolver]
          : [UserResolver],
      orphanedTypes:
        process.env.HANDLE_HOMEWORK === "true" ? [User, Homework] : [User],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  // apolloServer.applyMiddleware({ app, cors: false });

  apolloServer.listen(PORT, HOSTNAME, () => {
    console.log(`server up and running at http://${HOSTNAME}:${PORT}`);
  });
})();
