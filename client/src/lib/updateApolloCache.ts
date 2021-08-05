import { ApolloCache } from "@apollo/client";
import { Maybe, MeDocument, MeQuery } from "../generated/graphql";

export const updateMeQueryCache = (
  store: ApolloCache<any>,
  userData: Maybe<{
    __typename?: "User";
    id: number;
    username: string;
    email: string;
    bio: string;
    serverId: number;
    avatarId: number;
    age: number;
    provider?: Maybe<string>;
    emailPrivate: boolean;
  }>
) => {
  if (!userData) return null;
  store.writeQuery<MeQuery>({
    query: MeDocument,
    data: {
      __typename: "Query",
      me: userData,
    },
  });
  return null;
};
