import { User } from "../entity/User";
import { Response } from "express";
import {
  createRefreshToken,
  sendRefreshToken,
  createAccessToken,
} from "./AuthHelper";
import { LoginResponse, OAuthResponse } from "../resolvers/UserResolvers";
import { OAuthStatusType } from "../types/oauth";

export const loginOAuth = (
  user: User,
  response: Response,
  status: OAuthStatusType
) => {
  const token = createRefreshToken(user);
  sendRefreshToken(response, token);

  return {
    accessToken: createAccessToken(user),
    user,
    status: status,
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
