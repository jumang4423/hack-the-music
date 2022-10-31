import { Group } from "../generated/graphql";
import ErrStr from "../domain/ErrStr.domain";
import { GetGroupDriver } from "../drivers/getGroup.drivers";

export const GetGroupApp = async (
  groupId: string
): Promise<[Group | null, ErrStr]> => {
  const [groupObj, err] = await GetGroupDriver(groupId);
  if (err.IsError()) {
    return [null, err];
  }

  return [groupObj, err];
};
