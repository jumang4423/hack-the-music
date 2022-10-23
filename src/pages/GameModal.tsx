import { SwipeableDrawer } from "@mui/material";
import InputSimpler from "../components/InputSimpler";
import { ColorObj } from "../models/color";
import { GameModeEnum } from "../models/gameMode";
import { Group } from "./App";
import ChaosModeGame from "./games/chaos/ChaosModeGame";

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
  const viewState = {
    gameComponentSelector: (gameMode: GameModeEnum) => {
      switch (gameMode) {
        case GameModeEnum.chaos:
          return <ChaosModeGame group={group} setGroup={setGroup} />;
        default:
          return <div>Game not found</div>;
      }
    },
  };

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onOpen={() => {}}
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
          </div>
        </div>
      </div>
      <div style={{ height: "100vh" }} />
    </SwipeableDrawer>
  );
};

export default GameModal;
