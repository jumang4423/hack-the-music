import { Drawer } from "@mui/material";
import { ColorObj } from "../models/color";
import { GameModeEnum } from "../models/gameMode";
import { Group } from "./App";
import ChaosModeGame from "./games/chaos/ChaosModeGame";
import { ChaosGameSettingsType } from "../models/chaosGameType";
import { useState } from "react";
import TimeLimitBox from "./games/TimeLimitBox";
import { Button } from "@mui/material";

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
            <h2
              style={{
                color: ColorObj.black,
                marginBottom: "-12px",
              }}
            >
              # {group.name}
            </h2>
            <h3 style={{ color: ColorObj.gray }}>group id: {group.groupId}</h3>

            {viewState.gameComponentSelector(group.gameMode)}
            <TimeLimitBox
              gameSettings={gameSettings}
              setGameSettings={setGameSettings}
            />

            <hr style={{ width: "100%", marginTop: "2rem" }} />

            <div
              style={{
                marginTop: "2rem",
                width: "100%",
                display: "flex",
                right: 0,
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                sx={{ marginRight: "16px" }}
                onClick={() => {
                  refresh();
                }}
              >
                back
              </Button>
              <Button variant="contained">start</Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh" }} />
    </Drawer>
  );
};

export default GameModal;
