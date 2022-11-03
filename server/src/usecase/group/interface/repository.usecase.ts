import ErrStr from "../../../domain/ErrStr.domain";
import { Group } from "../../../generated/graphql";

export interface GroupRepository {
  findGroupById(id: string): Promise<[Group | null, ErrStr]>;
  uploadGroup(group: Group): Promise<[Group | null, ErrStr]>;
}
