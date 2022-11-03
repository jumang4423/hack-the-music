import { Drawer } from "@mui/material";
import { ColorObj } from "../models/color";
import { GameModeEnum } from "../models/gameMode";
import { Group } from "./App";
import ChaosModeGame from "./games/chaos/ChaosModeGame";
import { ChaosGameSettingsType } from "../models/chaosGameType";
import { useState } from "react";
import TimeLimitBox from "./games/TimeLimitBox";
import Devider from "../components/Devider";
import HackyButton from "../components/HackyButton";

type Props = {
  modalOpen: boolean;
  setModalOpen: any;
  group: Group;
  setGroup: (group: Group) => void;
};

const GameModal: React.FC<Props> = ({
  modalOpen,
  setModalOpen,
  group,
  setGroup,
}) => {
  const [gameSettings, setGameSettings] = useState<ChaosGameSettingsType>({
    randomTheme: {
      enabled: true,
      themes: [],
    },
    randomSamples: {
      enabled: true,
      samples: [],
    },
    randomImages: {
      enabled: false,
      images: [],
    },
    lifeSoundSampling: {
      enabled: false,
      generativeId: 0,
    },
    sceneIndex: 0,
    timeLimitMin: 30,
  });
  const refresh = () => {
    window.location.reload();
  };
  const viewState = {
    gameComponentSelector: (gameMode: GameModeEnum) => {
      if (!modalOpen) {
        return <></>;
      }

      switch (gameMode) {
        case GameModeEnum.chaos:
          return (
            <ChaosModeGame
              group={group}
              setGroup={setGroup}
              gameSettings={gameSettings}
              setGameSettings={setGameSettings}
            />
          );
        default:
          return <div>Game not found</div>;
      }
    },
  };

  return (
    <Drawer
      anchor={"bottom"}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "1rem 4rem 1rem 4rem",
            }}
          >
            <div
              style={{
                color: ColorObj.black,
                marginTop: "1.5rem",
                marginBottom: "1rem",
                fontSize: "1.3rem",
              }}
            >
              # {group.name} 💿 {group.groupId}
            </div>
            <Devider />
            {viewState.gameComponentSelector(group.gameMode)}
            <Devider />
            <TimeLimitBox
              gameSettings={gameSettings}
              setGameSettings={setGameSettings}
            />
            <Devider />
            <div
              style={{
                marginTop: "48px",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                color: "yellowgreen",
              }}
            >
              <h1> start? </h1>
            </div>

            <div
              style={{
                marginTop: "0",
                marginBottom: "4rem",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                right: 0,
              }}
            >
              <HackyButton
                name={"back"}
                mode={"light"}
                style={{
                  marginRight: "1rem",
                }}
                onClick={() => {
                  refresh();
                }}
              />

              <HackyButton
                name={"👍 start"}
                mode={"light"}
                prefer={true}
                style={{
                  marginRight: "0rem",
                }}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh" }} />
    </Drawer>
  );
};

export default GameModal;
