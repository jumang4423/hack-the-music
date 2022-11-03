import ErrStr from "../../domain/ErrStr.domain";
import { Group } from "../../generated/graphql";
import { GroupRepository } from "../../usecase/group/interface/repository.usecase";
import { GetGroupDriver } from "../../drivers/getGroup.drivers";
import { InsertGroupDriver } from "../../drivers/insertGroup.drivers";

export class GqlGroupRepository implements GroupRepository {
  public async findGroupById(groupId: string): Promise<[Group | null, ErrStr]> {
    return await GetGroupDriver(groupId);
  }

  public async uploadGroup(group: Group): Promise<[Group | null, ErrStr]> {
    const groupId = group.groupId;
    return await InsertGroupDriver(group, groupId);
  }
}
