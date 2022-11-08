import { Group, QueryResolvers, User } from "../generated/graphql";
import { GqlGroupRepository } from "../repository/group/GqlGroupRepository.repository";
import { GroupInteractor } from "../usecase/group/GroupInteractor.usecase";
import { GqlUserRepository } from "../repository/user/GqlUserRepository.repository";
import { UserInteractor } from "../usecase/user/UserInteractor.usecase";

export const queryResolvers: QueryResolvers = {
  group: async (_, { groupId }): Promise<Group> => {
    const repository = new GqlGroupRepository();
    const usecase = new GroupInteractor(repository);
    await usecase.handleFindGroupById({ groupId });

    return usecase.getResponseFindGroupById();
  },
  groups: async (_, { groupIds }): Promise<Group[]> => {
    const repository = new GqlGroupRepository();
    const usecase = new GroupInteractor(repository);
    await usecase.handleFindGroupsByIds({ groupIds });

    return usecase.getResponseFindGroupsByIds();
  },
  user: async (_, { userId }): Promise<User> => {
    const repository = new GqlUserRepository();
    const usecase = new UserInteractor(repository);
    await usecase.handleFindUserById({ userId });
    return usecase.getResponseFindUserById();
  },
};
