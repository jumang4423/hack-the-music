import { Group } from "../generated/graphql";
import ErrStr from "../domain/ErrStr.domain";
import { InsertGroupDriver } from "../drivers/insertGroup.drivers";

// this just connect to driver
export const InsertGroupApp = async (
  group: Group
): Promise<[Group | null, ErrStr]> => {
  const groupId = group.groupId;
  const [insertedGroup, err] = await InsertGroupDriver(group, groupId);

  return [insertedGroup, err];
};
