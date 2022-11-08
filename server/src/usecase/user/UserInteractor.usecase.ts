import { UserRepository } from "./interface/repository.usecase";
import ErrStr from "../../domain/ErrStr.domain";
import { ErrsEnumeration } from "../../util/err.util";
import { User } from "../../generated/graphql";

export class UserInteractor {
  private readonly userRepository: UserRepository;
  private response: any;
  private err: ErrStr;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.err = new ErrStr({});
  }

  handleInsertUser = async (args: { userId: string; name: string }) => {
    const { userId, name } = args;
    // validate
    if (userId === undefined || name === undefined) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }
    const [user, err] = await this.userRepository.insertUser(userId, name);
    this.response = user;
    this.err = err;
  };

  handleFindUserById = async (args: { userId: string }) => {
    const { userId } = args;
    // validate
    if (userId === undefined) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }
    const [user, err] = await this.userRepository.getUser(userId);
    this.response = user;
    this.err = err;
  };

  handleUserVisitGroup = async (args: { userId: string; groupId: string }) => {
    const { userId, groupId } = args;
    // validate
    if (userId === undefined || groupId === undefined) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }

    const [user, err] = await this.userRepository.userVisitGroup(
      userId,
      groupId
    );

    this.response = user;
    this.err = err;
  };

  getResponseInsertUser = (): User => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };

  getResponseFindUserById = (): User => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };

  getResponseUserVisitGroup = (): User => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };
}
