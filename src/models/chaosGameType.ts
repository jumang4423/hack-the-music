import { Theme, Sample } from "../gql/graphql";
export type ChaosGameSettingsType = {
  randomTheme: {
    enabled: boolean;
    themes: Array<Theme>;
  };
  randomSamples: {
    enabled: boolean;
    samples: Array<Sample>;
  };
  lifeSoundSampling: {
    enabled: boolean;
    generativeId: number;
  };
  sceneIndex: number;
  timeLimitMin: number;
};
