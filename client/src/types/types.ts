import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Maybe, User } from "../generated/graphql";

export type AvatarKeyType =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14";

export interface TabData {
  title: string;
  content: React.ReactNode;
}

export type UserType =
  | Maybe<
      {
        __typename?: "User" | undefined;
      } & Pick<
        User,
        | "id"
        | "username"
        | "email"
        | "bio"
        | "serverId"
        | "avatarId"
        | "age"
        | "provider"
        | "emailPrivate"
      >
    >
  | undefined
  | null;

export interface ApolloContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  shibe: ApolloClient<NormalizedCacheObject>;
  burrito: ApolloClient<NormalizedCacheObject>;
}

export interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    username: string,
    recaptchaToken: string
  ) => Promise<boolean>;
  currentUser: UserType;
  authState: () => "auth" | "loading" | "none";
}

export interface ExpiryObject {
  value: any;
  expiry: number;
}

export interface Homework {
  deadline: string;
  title: string;
  description: string;
}

export interface MarkRecordValue {
  count: number;
  homeworkList: Array<Homework>;
}

export type AlertType = "warning" | "success" | "info";

export interface DiscordAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface FacebookUserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}
