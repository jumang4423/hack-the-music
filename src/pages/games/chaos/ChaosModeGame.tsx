import { useState } from "react";
import { Group } from "../../App";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import ChaosWindow from "./ChaosWindow";
import RandomSample from "./RandomSample";

type Props = {
  group: Group;
  setGroup: (group: Group) => void;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const ChaosModeGame = ({
  group,
  setGroup,
  gameSettings,
  setGameSettings,
}: Props) => {
  const viewState = {
    sceneComponent: (sceneIndex: number) => {
      switch (sceneIndex) {
        case 0:
          return (
            <div>
              <h2
                style={{
                  marginTop: "32px",
                }}
              >
                🌀 chaos mode
              </h2>

              <ChaosWindow
                group={group}
                setGroup={setGroup}
                gameSettings={gameSettings}
                setGameSettings={setGameSettings}
              />
            </div>
          );
        default:
          return <div>Not found</div>;
      }
    },
  };

  return <div>{viewState.sceneComponent(gameSettings.sceneIndex)}</div>;
};

export default ChaosModeGame;
