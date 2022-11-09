import { ChaosGameSettingsType } from "../../../models/chaosGameType";

export const RandomGenresEnableCheckboxHandleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomGenres.enabled = event.target.checked;
  newGameSettings.randomGenres.genres = [];
  setGameSettings(newGameSettings);

  return void 0;
};
