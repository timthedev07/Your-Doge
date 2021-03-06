import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { unknownErrMsg } from "shared";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { setWithExpiry } from "../lib/localStorageExpiration";
import { AuthContextType, UserType } from "../types/types";
import { useApollo } from "./ApolloContext";
import { useRouter } from "next/router";
import { needAuthState } from "../lib/needAuthState";

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  // graphql stuff
  const [signin] = useLoginMutation();
  const [signup] = useRegisterMutation();
  const { setAccessToken } = useApollo()!;
  const { data, loading } = useMeQuery();
  const { pathname } = useRouter();

  // current user state
  const [currentUser, setCurrentUser] = useState<UserType>(null);

  useEffect(() => {
    setCurrentUser(data?.me);
  }, [data, loading]);

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
    username: string,
    recaptchaToken: string
  ) => {
    try {
      const res = await signup({
        variables: {
          email,
          password,
          username,
          recaptchaToken,
        },
      });
      if (res.data?.register) {
        return true;
      }
      throw new Error(unknownErrMsg);
    } catch (err: any) {
      try {
        throw new Error(err.graphQLErrors[0].message);
      } catch (err) {
        throw new Error(unknownErrMsg);
      }
    }
  };

  const authState = () => {
    if (currentUser !== null) {
      if (currentUser !== undefined) {
        return "auth";
      }
      return "loading";
    } else {
      return "none";
    }
  };

  const value = {
    login,
    register,
    currentUser,
    authState,
  };

  if (needAuthState(pathname) && loading) {
    return <Loading />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
