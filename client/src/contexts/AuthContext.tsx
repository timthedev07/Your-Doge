import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { unknownErrMsg } from "../constants/general";
import {
  Maybe,
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
  User,
  useRegisterMutation,
} from "../generated/graphql";
import { setWithExpiry } from "../lib/localStorageExpiration";
import { useApollo } from "./ApolloContext";

export interface ContextProps {
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
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<boolean>;
  currentUser: UserType;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  // graphql stuff
  const [signin] = useLoginMutation();
  const [signup] = useRegisterMutation();
  const { data, loading } = useMeQuery();
  const { setAccessToken } = useApollo()!;

  // current user state
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

      const data = res.data;

      if (data?.login) {
        setWithExpiry(
          window.localStorage,
          "serverId",
          data.login.user.serverId,
          new Date().valueOf() + 864000000
        ); // 10 days
        setAccessToken(data.login.accessToken);
        return true;
      }
      throw new Error(unknownErrMsg);
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
      if (res.data?.register) {
        return true;
      }
      throw new Error(unknownErrMsg);
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

  if (loading) return <Loading />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
