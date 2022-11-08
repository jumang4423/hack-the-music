import ErrStr from "../../domain/ErrStr.domain";
import { Group } from "../../generated/graphql";
import { GroupRepository } from "../../usecase/group/interface/repository.usecase";
import { GetGroupDriver } from "../../drivers/getGroup.drivers";
import { GetGroupsDriver } from "../../drivers/getGroups.drivers";
import { InsertGroupDriver } from "../../drivers/insertGroup.drivers";

export class GqlGroupRepository implements GroupRepository {
  public async findGroupById(groupId: string): Promise<[Group | null, ErrStr]> {
    return await GetGroupDriver(groupId);
  }

  public async uploadGroup(group: Group): Promise<[Group | null, ErrStr]> {
    const groupId = group.groupId;
    return await InsertGroupDriver(group, groupId);
  }

  public async findGroupsByIds(groupIds: string[]): Promise<[Group[], ErrStr]> {
    const [groups, err] = await GetGroupsDriver(groupIds);
    if (err.IsError()) {
      return [groups, err];
    }
    const indexedGroup: Array<Group> = groupIds.map((index) => {
      return groups.find((groupIndex) => groupIndex.groupId === index)!;
    });

    return [indexedGroup, new ErrStr({})];
  }
}
