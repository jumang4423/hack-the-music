import { GroupRepository } from "./interface/repository.usecase";
import ErrStr from "../../domain/ErrStr.domain";
import { ErrsEnumeration } from "../../util/err.util";
import { Group } from "../../generated/graphql";

export class GroupInteractor {
  private readonly groupRepository: GroupRepository;
  private response: any;
  private err: ErrStr;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
    this.err = new ErrStr({});
  }

  handleInsertGroup = async (args: {
    groupId: string;
    name: string;
    gameMode: number;
    adminUserId: string;
  }) => {
    const { groupId, name, gameMode, adminUserId } = args;
    // validate
    if (
      groupId === undefined ||
      name === undefined ||
      gameMode === undefined ||
      adminUserId === undefined
    ) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }
    const [group, err] = await this.groupRepository.uploadGroup({
      groupId,
      name,
      gameMode,
      adminUserId,
    } as Group);
    this.response = group;
    this.err = err;
  };

  handleFindGroupById = async (args: { groupId: string }) => {
    const { groupId } = args;
    // validate
    if (groupId === undefined) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }
    const [group, err] = await this.groupRepository.findGroupById(groupId);
    this.response = group;
    this.err = err;
  };

  handleFindGroupsByIds = async (args: { groupIds: string[] }) => {
    const { groupIds } = args;
    // validate
    if (groupIds === undefined) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }
    if (groupIds.length === 0) {
      return [[], new ErrStr({})];
    }
    const pagedGroupIds =
      groupIds.length > 10
        ? groupIds.slice(groupIds.length - 10, groupIds.length)
        : groupIds;

    console.log(pagedGroupIds);

    const [groups, err] = await this.groupRepository.findGroupsByIds(
      pagedGroupIds
    );
    console.log(groups.map((group) => group.groupId));
    this.response = groups;
    this.err = err;
  };

  getResponseInsertGroup = (): Group => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };

  getResponseFindGroupById = (): Group => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };

  getResponseFindGroupsByIds = (): Array<Group> => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };
}
