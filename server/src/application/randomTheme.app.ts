import { Theme } from "../generated/graphql";
import { GetCollLenDriver } from "../drivers/getCollLen.drivers";
import ErrStr from "../domain/ErrStr.domain";
import { GetRandomThemeDriver } from "../drivers/getRandomTheme.drivers";

export const RandomThemeApp = async (): Promise<[Theme | null, ErrStr]> => {
  const [themeGlobalLenCached, err] = await GetCollLenDriver("themes");
  if (err.IsError()) {
    return [null, err];
  }
  const [randomTheme, err2] = await GetRandomThemeDriver(themeGlobalLenCached);
  if (err2.IsError()) {
    return [null, err2];
  }

  return [randomTheme, new ErrStr({ isErr: false })];
};
