import { Image } from "../generated/graphql";
import ErrStr from "../domain/ErrStr.domain";
import { GetCollLenDriver } from "../drivers/getCollLen.drivers";
import { GetRandomImagesDriver } from "../drivers/getRandomImages.drivers";
import { ErrsEnumeration } from "../util/err.util";

export const RandomImageApp = async (): Promise<[Image | null, ErrStr]> => {
  const [imageGlobalLenCached, err] = await GetCollLenDriver("images");
  if (err.IsError()) {
    return [null, err];
  }

  const imageFetchIndexies: Array<number> = [];
  imageFetchIndexies.push(Math.floor(Math.random() * imageGlobalLenCached));

  const [randomImage, _, err2] = await GetRandomImagesDriver(
    imageFetchIndexies
  );
  if (err2.IsError()) {
    return [null, err2];
  }

  if (randomImage.length === 0) {
    return [
      null,
      new ErrStr({
        isErr: true,
        errStr: ErrsEnumeration.ENOUGH_IMAGE_INSERTED,
      }),
    ];
  }

  return [randomImage[0], new ErrStr({ isErr: false })];
};
