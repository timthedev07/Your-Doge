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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = require("jsonwebtoken");
const AuthHelper_1 = require("../AuthHelper");
const User_1 = require("../entity/User");
exports.router = express_1.default.Router();
exports.router.post("/refresh_token", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jimrayd;
    if (!token) {
        return res.send({ ok: false, accessToken: "" });
    }
    let payload = null;
    try {
        payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        console.error(err);
        return res.send({ ok: false, accessToken: "" });
    }
    const user = yield User_1.User.findOne({ id: payload.userId });
    if (!user) {
        return res.send({ ok: false, accessToken: "" });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: "" });
    }
    AuthHelper_1.sendRefreshToken(res, AuthHelper_1.createRefreshToken(user));
    const newAccessToken = AuthHelper_1.createAccessToken(user);
    return res.send({ ok: true, accessToken: newAccessToken });
}));
//# sourceMappingURL=AuthRoute.js.map