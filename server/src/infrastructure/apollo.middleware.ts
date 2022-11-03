import { ApolloServer, gql } from "apollo-server-express";
import { readFileSync } from "fs";
import { join } from "path";
import { resolvers } from "./../resolvers";
const typeDefs = gql(
  readFileSync(join(__dirname, "..", "..", "schema.graphql"), "utf-8")
);

export const ApolloMiddleware = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});
