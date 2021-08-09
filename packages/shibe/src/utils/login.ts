import { User } from "../entity/User";
import { Response } from "express";
import {
  createRefreshToken,
  sendRefreshToken,
  createAccessToken,
} from "./AuthHelper";
import { LoginResponse, OAuthResponse } from "../resolvers/UserResolvers";

export const loginOAuth = (user: User, response: Response) => {
  const token = createRefreshToken(user);
  sendRefreshToken(response, token);

  return {
    accessToken: createAccessToken(user),
    user,
    status: "logged-in",
  } as OAuthResponse;
};

export const login = (user: User, response: Response) => {
  const token = createRefreshToken(user);
  sendRefreshToken(response, token);

  return {
    accessToken: createAccessToken(user),
    user,
  } as LoginResponse;
};
