import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Sample } from "../../../gql/graphql";

export const RandomSamplesEnableCheckboxHandleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomSamples.enabled = event.target.checked;
  newGameSettings.randomSamples.samples = [];
  setGameSettings(newGameSettings);

  return void 0;
};

export const RandomSampleDataHandle = (
  sample: Sample,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomSamples.samples.push(sample);
  setGameSettings(newGameSettings);

  return void 0;
};
