import { TwitterRepository } from "../../usecase/twitter/interface/repository.usecase";
import ErrStr from "../../domain/ErrStr.domain";
import { GetTweetFromUser } from "../../drivers/twitter.drivers";

export class GqlTwitterRepository implements TwitterRepository {
  public async getRandomGenreFromTwitter(): Promise<[string, ErrStr]> {
    return await GetTweetFromUser("BotGenre");
  }
}
