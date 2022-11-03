import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Image } from "../../../gql/graphql";

export const RandomImagesEnableCheckboxHandleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomImages.enabled = event.target.checked;
  newGameSettings.randomImages.images = [];
  setGameSettings(newGameSettings);

  return void 0;
};

export const RandomImageDataHandle = (
  image: Image,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomImages.images.push(image);
  setGameSettings(newGameSettings);

  return void 0;
};
