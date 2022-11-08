import ErrStr from "../../../domain/ErrStr.domain";
import { User } from "../../../generated/graphql";

export interface UserRepository {
  insertUser: (userId: string, name: string) => Promise<[User | null, ErrStr]>;
  getUser: (userId: string) => Promise<[User | null, ErrStr]>;
  userVisitGroup: (
    userId: string,
    groupId: string
  ) => Promise<[User | null, ErrStr]>;
}
