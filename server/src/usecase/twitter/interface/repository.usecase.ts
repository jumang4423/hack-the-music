import ErrStr from "../../../domain/ErrStr.domain";

export interface TwitterRepository {
  getRandomGenreFromTwitter(): Promise<[string, ErrStr]>;
}
