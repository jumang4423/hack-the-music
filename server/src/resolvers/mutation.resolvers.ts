import { Theme, Sample, Image, User } from "../generated/graphql";
import { Group, MutationResolvers } from "../generated/graphql";
import { GqlGroupRepository } from "../repository/group/GqlGroupRepository.repository";
import { GroupInteractor } from "../usecase/group/GroupInteractor.usecase";
import { GqlImageRepository } from "../repository/image/GqlImageRepository.repository";
import { ImageInteractor } from "../usecase/image/ImageInteractor.usecase";
import { GqlSampleRepository } from "../repository/sample/GqlSampleRepository.repository";
import { SampleInteractor } from "../usecase/sample/SampleInteractor.usecase";
import { GqlThemeRepository } from "../repository/theme/GqlThemeRepository.repository";
import { ThemeInteractor } from "../usecase/theme/ThemeInteractor.usecase";
import { GqlUserRepository } from "../repository/user/GqlUserRepository.repository";
import { UserInteractor } from "../usecase/user/UserInteractor.usecase";
import { GqlTwitterRepository } from "../repository/twitter/GqlTwitterRepository.repository";
import { TwitterInteractor } from "../usecase/twitter/TwitterInteractor.usecase";

export const mutationResolvers: MutationResolvers = {
  insertGroup: async (
    _,
    { groupId, name, gameMode, adminUserId }
  ): Promise<Group> => {
    const repository = new GqlGroupRepository();
    const usecase = new GroupInteractor(repository);
    await usecase.handleInsertGroup({ groupId, name, gameMode, adminUserId });
    return usecase.getResponseInsertGroup();
  },
  uploadTheme: async (
    _,
    { content, description, idUploadedBy }
  ): Promise<Theme> => {
    const repository = new GqlThemeRepository();
    const usecase = new ThemeInteractor(repository);
    await usecase.handleUploadTheme({ content, description, idUploadedBy });
    return usecase.getResponseUploadTheme();
  },
  uploadSample: async (
    _,
    { url, description, idUploadedBy }
  ): Promise<Sample> => {
    const repository = new GqlSampleRepository();
    const usecase = new SampleInteractor(repository);
    await usecase.handleUploadSample({ url, description, idUploadedBy });
    return usecase.getResponseUploadSample();
  },
  uploadImage: async (
    _,
    { url, description, idUploadedBy }
  ): Promise<Image> => {
    const repository = new GqlImageRepository();
    const usecase = new ImageInteractor(repository);
    await usecase.handleUploadImage({ url, description, idUploadedBy });
    return usecase.getResponseUploadImage();
  },
  randomTheme: async (): Promise<Theme> => {
    const repository = new GqlThemeRepository();
    const usecase = new ThemeInteractor(repository);
    await usecase.handleGetRandomTheme();
    return usecase.getResponseGetRandomTheme();
  },
  randomSample: async (): Promise<Sample> => {
    const repository = new GqlSampleRepository();
    const usecase = new SampleInteractor(repository);
    await usecase.handleGetRandomSample();
    return usecase.getResponseGetRandomSample();
  },
  randomImage: async (): Promise<Image> => {
    const repository = new GqlImageRepository();
    const usecase = new ImageInteractor(repository);
    await usecase.handleGetRandomImage();
    return usecase.getResponseGetRandomImage();
  },
  randomImages: async (_, { count }): Promise<Image[]> => {
    const repository = new GqlImageRepository();
    const usecase = new ImageInteractor(repository);
    await usecase.handleGetRandomImages({ count });
    return usecase.getResponseGetRandomImages();
  },
  insertUser: async (_, { userId, name }): Promise<User> => {
    const repository = new GqlUserRepository();
    const usecase = new UserInteractor(repository);
    await usecase.handleInsertUser({ userId, name });
    return usecase.getResponseInsertUser();
  },
  userVisitGroup: async (_, { userId, groupId }): Promise<User> => {
    const repository = new GqlUserRepository();
    const usecase = new UserInteractor(repository);
    await usecase.handleUserVisitGroup({ userId, groupId });
    return usecase.getResponseUserVisitGroup();
  },
  getRandomGenre: async (): Promise<string> => {
    const repository = new GqlTwitterRepository();
    const usecase = new TwitterInteractor(repository);
    await usecase.handleGetRandomGenreFromTwitter();
    return usecase.getResponseGetRandomGenreFromTwitter();
  },
};
