import { Group, QueryResolvers } from "../generated/graphql";
import { GetGroupApp } from "../application/group.app";

export const queryResolvers: QueryResolvers = {
  group: async (_, { groupId }): Promise<Group> => {
    const [vle, err] = await GetGroupApp(groupId);
    if (err.IsError()) {
      throw err.GetError;
    }

    return vle!;
  },
};
