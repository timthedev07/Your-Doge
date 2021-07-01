import React from "react";
import { useParams } from "react-router";
import { Me } from "./account/Me";
import { OtherUsers } from "./account/OtherUsers";

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

interface AccountProps {}

interface UserParams {
  username: string;
}

export const Account: React.FC<AccountProps> = () => {
  const { username } = useParams<UserParams>();

  if (username === "me") {
    return <Me />;
  }
  return <OtherUsers username={username} />;
};
