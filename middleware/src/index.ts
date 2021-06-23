import "reflect-metadata";
import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ServerResolver } from "./ServerResolver";
import cors from "cors";

const FRONTEND_URL = "http://localhost:3000";

// specify the routes
const PORT: number = 5000;

(async () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URL,
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

  app.listen(PORT, () => {
    console.log(`app listening at: http://localhost:${PORT}`);
  });
})();

// createConnection()
//   .then(async (connection) => {
//     console.log("Inserting a new user into the database...");
//     const user = new Server();
//     user.full = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch((error) => console.log(error));
