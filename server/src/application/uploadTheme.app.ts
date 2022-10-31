import { Theme } from "../generated/graphql";
import ErrStr from "../domain/ErrStr.domain";
import { GetCollLenDriver } from "../drivers/getCollLen.drivers";
import { InsertThemeDriver } from "../drivers/insertTheme.drivers";

export const UploadThemeApp = async (
  theme: Theme
): Promise<[Theme | null, ErrStr]> => {
  const [themeGlobalLenCached, err] = await GetCollLenDriver("themes");
  if (err.IsError()) {
    return [null, err];
  }
  const [_, err2] = await InsertThemeDriver(theme, themeGlobalLenCached);
  if (err2.IsError()) {
    return [null, err];
  }
  return [theme, new ErrStr({ isErr: false })];
};
