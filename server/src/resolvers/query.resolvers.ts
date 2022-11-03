import { Group, QueryResolvers } from "../generated/graphql";
import { GqlGroupRepository } from "../repository/group/GqlGroupRepository.repository";
import { GroupInteractor } from "../usecase/group/GroupInteractor.usecase";

export const queryResolvers: QueryResolvers = {
  group: async (_, { groupId }): Promise<Group> => {
    const repository = new GqlGroupRepository();
    const usecase = new GroupInteractor(repository);
    await usecase.handleFindGroupById({ groupId });

    return usecase.getResponseFindGroupById();
  },
};
