import ErrStr from "../../../domain/ErrStr.domain";
import { Theme, AdditionalTheme } from "../../../generated/graphql";

export interface ThemeRepository {
  getRandomTheme(): Promise<[Theme | null, ErrStr]>;
  getRandomAdditionalTheme(
    toUserId: string,
    toName: string
  ): Promise<[AdditionalTheme | null, ErrStr]>;
  uploadTheme(theme: Theme): Promise<[Theme | null, ErrStr]>;
}
