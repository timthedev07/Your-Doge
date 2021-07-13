import { specifiedDirectives } from "graphql";
import federationDirectives from "@apollo/federation/dist/directives";
import gql from "graphql-tag";
import {
  printSchema,
  buildFederatedSchema as buildApolloFederationSchema,
} from "@apollo/federation";
import { addResolversToSchema, GraphQLResolverMap } from "apollo-graphql";
import { buildSchema, BuildSchemaOptions } from "type-graphql";
import { createResolversMap } from "type-graphql/dist/utils/createResolversMap";

export const buildFederatedSchema = async (
  options: Omit<BuildSchemaOptions, "skipCheck">,
  referenceResolvers?: GraphQLResolverMap<any>
) => {
  const schema = await buildSchema({
    ...options,
    directives: [
      ...specifiedDirectives,
      ...federationDirectives,
      ...(options.directives || []),
    ],
    skipCheck: true,
  });

  const federatedSchema = buildApolloFederationSchema({
    typeDefs: gql(printSchema(schema)),
    resolvers: createResolversMap(schema) as any,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }
  return federatedSchema;
};
