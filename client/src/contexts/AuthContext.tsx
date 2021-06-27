import React, { useContext, useEffect, useState } from "react";
import { unknownErrMsg } from "..";
import {
  LoginMutation,
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
  currUser: UserType | null;
  setCurrUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

type UserType = {
  __typename?: "User" | undefined;
} & Pick<User, "email" | "id" | "username">;

export const AuthControl: React.FC<AuthControlProps> = ({ children }) => {
  const [signin] = useLoginMutation();
  const [signup] = useRegisterMutation();
  const { data } = useMeQuery({ fetchPolicy: "network-only" });
  const [currUser, setCurrUser] = useState<UserType | null>(() => null);

  useEffect(() => {
    if (data && data.me) {
      console.log("Heeeah is the data: ", data.me);
      setCurrUser(data.me);
    }
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
          setCurrUser(data.login.user);
        },
      });

      return res.data;
    } catch (err: any) {
      try {
        throw new Error(err.graphQLErrors[0].message);
      } catch (err) {
        throw new Error(unknownErrMsg);
      }
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
        update: (store, { data }) => {
          if (!data) return null;
          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data.register.user,
            },
          });
          setCurrUser(data.register.user);
        },
      });
      return res.data;
    } catch (err: any) {
      try {
        throw new Error(err.graphQLErrors[0].message);
      } catch (err) {
        throw new Error(unknownErrMsg);
      }
    }
  };

  const value = {
    login,
    register,
    currUser,
    setCurrUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
