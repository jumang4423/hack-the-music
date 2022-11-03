import ErrStr from "../../domain/ErrStr.domain";
import { Theme } from "../../generated/graphql";
import { ThemeRepository } from "../../usecase/theme/interface/repository.usecase";
import { GetRandomThemeDriver } from "../../drivers/getRandomTheme.drivers";
import { GetCollLenDriver } from "../../drivers/getCollLen.drivers";
import { InsertThemeDriver } from "../../drivers/insertTheme.drivers";

export class GqlThemeRepository implements ThemeRepository {
  public async getRandomTheme(): Promise<[Theme | null, ErrStr]> {
    const [themeGlobalLenCached, err] = await GetCollLenDriver("themes");
    if (err.IsError()) {
      return [null, err];
    }
    const randomIndex = Math.floor(Math.random() * themeGlobalLenCached);
    const [randomTheme, err2] = await GetRandomThemeDriver(randomIndex);
    if (err2.IsError()) {
      return [null, err2];
    }

    return [randomTheme, new ErrStr({ isErr: false })];
  }

  public async uploadTheme(theme: Theme): Promise<[Theme | null, ErrStr]> {
    const [themeGlobalLenCached, err] = await GetCollLenDriver("themes");
    if (err.IsError()) {
      return [null, err];
    }
    const [_, err2] = await InsertThemeDriver(theme, themeGlobalLenCached);
    if (err2.IsError()) {
      return [null, err];
    }
    return [theme, new ErrStr({ isErr: false })];
  }
}
