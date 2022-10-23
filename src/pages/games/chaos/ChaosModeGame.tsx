import { useState } from "react";
import { Group } from "../../App";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import ChaosWindow from "./ChaosWindow";

type Props = {
  group: Group;
  setGroup: (group: Group) => void;
};

const ChaosModeGame = ({ group, setGroup }: Props) => {
  const [gameSetings, setGameSettings] = useState<ChaosGameSettingsType>({
    randomTheme: {
      enabled: true,
      themes: [],
    },
    randomSamples: {
      enabled: false,
      sampleIndexes: [],
    },
    lifeSoundSampling: {
      enabled: false,
      generativeId: 0,
    },
    sceneIndex: 0,
  });
  const viewState = {
    sceneComponent: (sceneIndex: number) => {
      switch (sceneIndex) {
        case 0:
          return (
            <ChaosWindow
              group={group}
              setGroup={setGroup}
              gameSettings={gameSetings}
              setGameSettings={setGameSettings}
            />
          );
        default:
          return <div>Not found</div>;
      }
    },
  };

  return (
    <div>
      <h2
        style={{
          marginTop: "32px",
        }}
      >
        🌀 chaos mode
      </h2>
      {viewState.sceneComponent(gameSetings.sceneIndex)}
    </div>
  );
};

export default ChaosModeGame;
