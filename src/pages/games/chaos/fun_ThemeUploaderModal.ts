import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Theme } from "../../../gql/graphql";

export const OnThemeFetch = (
  uploadTheme: Theme,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void,
  onClose: () => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomTheme.themes.push({
    content: uploadTheme.content,
    description: uploadTheme.description,
    idUploadedBy: uploadTheme.idUploadedBy,
  });
  setGameSettings(newGameSettings);

  onClose();
};

export const ThemeUploaderFormvalidation = (
  theme: string,
  setThemeError: (bool: boolean) => void
): boolean => {
  if (theme === "") {
    setThemeError(true);
    return false;
  }
  setThemeError(false);

  return true;
};
