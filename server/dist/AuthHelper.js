"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const TOKEN_EXPIRATION_DURATION = "40min";
const COOKIE_EXPIRATION_DURATION = "10d";
const createAccessToken = (user) => {
    return jsonwebtoken_1.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRATION_DURATION,
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return jsonwebtoken_1.sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: COOKIE_EXPIRATION_DURATION,
    });
};
exports.createRefreshToken = createRefreshToken;
const sendRefreshToken = (res, token) => {
    res.cookie("jimrayd", token, { httpOnly: true });
};
exports.sendRefreshToken = sendRefreshToken;
//# sourceMappingURL=AuthHelper.js.map