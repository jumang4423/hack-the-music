import { Image } from "../generated/graphql";
import ErrStr from "../domain/ErrStr.domain";
import { GetCollLenDriver } from "../drivers/getCollLen.drivers";
import { GetRandomImagesDriver } from "../drivers/getRandomImages.drivers";
import { ErrsEnumeration } from "../util/err.util";

export const RandomImagesApp = async (args: {
  count: number;
}): Promise<[Array<Image>, ErrStr]> => {
  if (args.count > 10) {
    return [
      [],
      new ErrStr({
        isErr: true,
        errStr: ErrsEnumeration.MAX_QUERY_NUMBER_IS_10,
      }),
    ];
  }

  const [imageGlobalLenCached, err] = await GetCollLenDriver("images");
  if (err.IsError()) {
    return [[], err];
  }
  const imageFetchIndexies: Array<number> = [];
  for (let i = 0; i < args.count; i++) {
    imageFetchIndexies.push(Math.floor(Math.random() * imageGlobalLenCached));
  }

  const [randomImagesBox, randomImagesIndexies, err2] =
    await GetRandomImagesDriver(imageFetchIndexies);
  if (err2.IsError()) {
    return [[], err2];
  }

  const randomImages: Array<Image> = imageFetchIndexies.map((index) => {
    const imageBoxIndex = randomImagesIndexies.find(
      (imageIndex) => imageIndex === index
    )!;
    return randomImagesBox[imageBoxIndex];
  });

  return [randomImages, new ErrStr({ isErr: false })];
};
