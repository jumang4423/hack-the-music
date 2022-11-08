import ErrStr from "../../domain/ErrStr.domain";
import { User } from "../../generated/graphql";
import { UserRepository } from "../../usecase/user/interface/repository.usecase";
import { InsertUserDriver } from "../../drivers/insertUser.drivers";
import { GetUserDriver } from "../../drivers/getUser.drivers";
import { UserVisitGroupDriver } from "../../drivers/userVisitGroup.drivers";

export class GqlUserRepository implements UserRepository {
  public async insertUser(
    userId: string,
    name: string
  ): Promise<[User | null, ErrStr]> {
    const newUser: User = { userId, name, accessedGroupIDs: [] };
    return await InsertUserDriver(newUser);
  }
  public async getUser(userId: string): Promise<[User | null, ErrStr]> {
    return await GetUserDriver(userId);
  }

  public async userVisitGroup(
    userId: string,
    groupId: string
  ): Promise<[User | null, ErrStr]> {
    return await UserVisitGroupDriver(userId, groupId);
  }
}
