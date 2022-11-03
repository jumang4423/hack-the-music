import ErrStr from "../../../domain/ErrStr.domain";
import { Image } from "../../../generated/graphql";

export interface ImageRepository {
  getRandomImage(): Promise<[Image | null, ErrStr]>;
  getRandomImages(count: number): Promise<[Array<Image>, ErrStr]>;
  uploadImage(image: Image): Promise<[Image | null, ErrStr]>;
}
