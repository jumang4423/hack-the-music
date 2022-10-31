import { Theme, Sample } from "../generated/graphql";
import { InsertGroupApp } from "../application/insertGroup.app";
import { RandomThemeApp } from "../application/randomTheme.app";
import { RandomSampleApp } from "../application/randomSample.app";
import { UploadThemeApp } from "../application/uploadTheme.app";
import { UploadSampleApp } from "../application/uploadSample.app";
import { Group, MutationResolvers } from "../generated/graphql";

export const mutationResolvers: MutationResolvers = {
  insertGroup: async (_, { groupId, name, gameMode }): Promise<Group> => {
    const [vle, err] = await InsertGroupApp({
      groupId,
      name,
      gameMode,
    } as Group);
    if (err.IsError()) {
      throw err.GetError();
    }

    return vle!;
  },
  uploadTheme: async (
    _,
    { content, description, idUploadedBy }
  ): Promise<Theme> => {
    const [vle, err] = await UploadThemeApp({
      content,
      description,
      idUploadedBy,
    } as Theme);
    if (err.IsError()) {
      throw err.GetError();
    }

    return vle!;
  },
  uploadSample: async (
    _,
    { url, description, idUploadedBy }
  ): Promise<Sample> => {
    const [vle, err] = await UploadSampleApp({
      url,
      description,
      idUploadedBy,
    } as Sample);
    if (err.IsError()) {
      throw err.GetError();
    }

    return vle!;
  },
  randomTheme: async (): Promise<Theme> => {
    const [vle, err] = await RandomThemeApp();
    if (err.IsError()) {
      throw err.GetError();
    }

    return vle!;
  },
  randomSample: async (): Promise<Sample> => {
    const [vle, err] = await RandomSampleApp();
    if (err.IsError()) {
      throw err.GetError();
    }

    return vle!;
  },
};
