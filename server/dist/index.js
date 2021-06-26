"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./Resolvers/UserResolver");
const typeorm_1 = require("typeorm");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const AuthRoute_1 = require("./routes/AuthRoute");
const HomeworkResolver_1 = require("./Resolvers/HomeworkResolver");
const PORT = process.env.PORT || "4000";
const FRONTEND_URL = "https://doyourstuff.netlify.app/";
const DEV_FRONTEND = "http://localhost:3000/";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cookie_parser_1.default());
    app.use(express_1.default.json());
    app.use(cors_1.default({
        credentials: true,
        origin: [FRONTEND_URL, DEV_FRONTEND],
    }));
    app.use("/auth", AuthRoute_1.router);
    yield typeorm_1.createConnection();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: process.env.HANDLE_HOMEWORK === "true"
                ? [UserResolver_1.UserResolver, HomeworkResolver_1.HomeworkResolver]
                : [UserResolver_1.UserResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => {
        console.log(`app listening at: http://localhost:${PORT}`);
    });
}))();
//# sourceMappingURL=index.js.map