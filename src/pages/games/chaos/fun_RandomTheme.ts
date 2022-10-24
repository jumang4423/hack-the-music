import { Theme } from "../../../fun_main";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";

export const RandomThemeEanbleCheckboxHandleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomTheme.enabled = event.target.checked;
  newGameSettings.randomTheme.themes = [];
  setGameSettings(newGameSettings);

  return void 0;
};

export const RandomThemeManuallyAddButtonHandleClick = (
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomTheme.themes.push({
    themeIndex: null,
    content: "",
    description: null,
  });
  setGameSettings(newGameSettings);

  return void 0;
};

export const RandomThemeDataHandle = (
  theme: Theme,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomTheme.themes.push(theme);
  setGameSettings(newGameSettings);

  return void 0;
};
