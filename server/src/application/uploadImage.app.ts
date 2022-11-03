import { Image } from "../generated/graphql";
import ErrStr from "../domain/ErrStr.domain";
import { GetCollLenDriver } from "../drivers/getCollLen.drivers";
import { InsertImageDriver } from "../drivers/insertImage.drivers";

export const UploadImageApp = async (
  image: Image
): Promise<[Image | null, ErrStr]> => {
  const [imageGlobalLenCached, err] = await GetCollLenDriver("images");
  if (err.IsError()) {
    return [null, err];
  }
  const [_, err2] = await InsertImageDriver(image, imageGlobalLenCached);
  if (err2.IsError()) {
    return [null, err];
  }
  return [image, new ErrStr({ isErr: false })];
};
