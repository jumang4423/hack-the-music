import { Resolvers } from "../generated/graphql";
import { mutationResolvers } from "./mutation.resolvers";
import { queryResolvers } from "./query.resolvers";

export const resolvers: Resolvers<any> = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
