import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";

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

  const serviceList = [{ name: "users", url: "http://localhost:4000/" }];

  const gateway = new ApolloGateway({
    serviceList,
  });

  const { schema, executor } = await gateway.load();

  const apolloServer = new ApolloServer({
    schema,
    executor,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, HOSTNAME, () => {
    console.log(`gateway up and running at http://${HOSTNAME}:${PORT}`);
  });
})();
