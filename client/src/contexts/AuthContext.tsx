import React, { useContext, useEffect, useState } from "react";
import { unknownErrMsg } from "../constants/general";
import {
  LoginMutation,
  Maybe,
  MeDocument,
  MeQuery,
  RegisterMutation,
  useLoginMutation,
  useMeQuery,
  User,
  useRegisterMutation,
} from "../generated/graphql";

interface AuthControlProps {
  children: JSX.Element;
}

type UserType =
  | Maybe<
      {
        __typename?: "User" | undefined;
      } & Pick<
        User,
        "id" | "username" | "email" | "bio" | "serverId" | "avatarId" | "age"
      >
    >
  | undefined;

interface AuthContextType {
  login: (
    email: string,
    password: string
  ) => Promise<LoginMutation | null | undefined>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<RegisterMutation | null | undefined>;
  currentUser: UserType;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthControlProps> = ({ children }) => {
  const [signin] = useLoginMutation();
  const [signup] = useRegisterMutation();
  const [currentUser, setCurrentUser] = useState<
    | Maybe<
        {
          __typename?: "User" | undefined;
        } & Pick<
          User,
          "id" | "username" | "email" | "bio" | "serverId" | "avatarId" | "age"
        >
      >
    | undefined
    | null
  >(() => null);

  const { data } = useMeQuery();

  useEffect(() => {
    setCurrentUser(data?.me || null);
  }, [data]);

  /**
   * Tries to sign a user in, returns the data on success and throws an error otherwise
   * @param email
   * @param password
   * @returns
   */
  const login = async (email: string, password: string) => {
    try {
      const res = await signin({
        variables: {
          email,
          password,
        },
        update: (store, { data }) => {
          if (!data) return null;
          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data.login.user,
            },
          });
          return null;
        },
      });

      return res.data;
    } catch (err: any) {
      if (err?.graphQLErrors[0]?.message) {
        throw new Error(err.graphQLErrors[0].message);
      }
      throw new Error(unknownErrMsg);
    }
  };

  /**
   * Tries to sign a user in, returns the data on success and throws an error otherwise
   * @param email
   * @param password
   * @returns
   */
  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const res = await signup({
        variables: {
          email,
          password,
          username,
        },
      });
      return res.data;
    } catch (err: any) {
      if (err?.graphQLErrors[0]?.message) {
        throw new Error(err.graphQLErrors[0].message);
      }
      throw new Error(unknownErrMsg);
    }
  };

  const value = {
    login,
    register,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
