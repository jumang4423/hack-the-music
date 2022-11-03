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
  }) => {
    const { groupId, name, gameMode } = args;
    // validate
    if (groupId === undefined || name === undefined || gameMode === undefined) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }
    const [group, err] = await this.groupRepository.uploadGroup({
      groupId,
      name,
      gameMode,
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
}
