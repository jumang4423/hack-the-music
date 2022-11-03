import ErrStr from "../../../domain/ErrStr.domain";
import { Theme } from "../../../generated/graphql";

export interface ThemeRepository {
  getRandomTheme(): Promise<[Theme | null, ErrStr]>;
  uploadTheme(theme: Theme): Promise<[Theme | null, ErrStr]>;
}
