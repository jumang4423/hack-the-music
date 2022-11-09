import { Theme, Sample, Image } from "../gql/graphql";
export type ChaosGameSettingsType = {
  randomTheme: {
    enabled: boolean;
    themes: Array<Theme>;
  };
  randomSamples: {
    enabled: boolean;
    samples: Array<Sample>;
  };
  randomImages: {
    enabled: boolean;
    images: Array<Image>;
  };
  lifeSoundSampling: {
    enabled: boolean;
    generativeId: number;
  };
  randomVideos: {
    enabled: boolean;
  };
  randomGenres: {
    enabled: boolean;
    genres: Array<{ userId: string; name: string; genreName: string }>;
  };
  sceneIndex: number;
  timeLimitMin: number;
  gameStarted: boolean;
  gameEnded: boolean;
  newGroupId: string;
};
