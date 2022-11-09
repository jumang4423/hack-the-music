import { TwitterRepository } from "./interface/repository.usecase";
import ErrStr from "../../domain/ErrStr.domain";

export class TwitterInteractor {
  private readonly twitterRepository: TwitterRepository;
  private response: any;
  private err: ErrStr;

  constructor(twitterRepository: TwitterRepository) {
    this.twitterRepository = twitterRepository;
    this.err = new ErrStr({});
  }

  handleGetRandomGenreFromTwitter = async () => {
    const [randomTweet, err] =
      await this.twitterRepository.getRandomGenreFromTwitter();
    this.response = randomTweet;
    this.err = err;
  };

  getResponseGetRandomGenreFromTwitter = (): string => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };
}
