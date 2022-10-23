import { Theme } from "../fun_main";

export type ChaosGameSettingsType = {
  randomTheme: {
    enabled: boolean;
    themes: Array<Theme>;
  };
  randomSamples: {
    enabled: boolean;
    sampleIndexes: Array<number>;
  };
  lifeSoundSampling: {
    enabled: boolean;
    generativeId: number;
  };
  sceneIndex: number;
};
