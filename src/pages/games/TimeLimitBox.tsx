import { useState } from "react";
import { ChaosGameSettingsType } from "../../models/chaosGameType";
import GenericModal from "../../components/GenericModal";
import TimeLimitModal from "./TimeLimitModal";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const TimeLimitBox = ({ gameSettings, setGameSettings }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      style={{
        marginTop: "36px",
        marginBottom: "36px",
      }}
    >
      <h2>λ time limit </h2>
      <div
        style={{
          width: "200px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => {
            setIsModalOpen(true);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "green",
            height: "100%",
            width: "128px",
            backgroundColor: "#f5f5f5",
          }}
        >
          modify
        </div>
        <div>{gameSettings.timeLimitMin} min</div>
      </div>

      <GenericModal
        open={isModalOpen}
        title={"😱 time limit"}
        handleClose={handleClose}
        gameSettings={gameSettings}
        setGameSettings={setGameSettings}
      >
        <TimeLimitModal
          gameSettings={gameSettings}
          setGameSettings={setGameSettings}
          onClose={handleClose}
        />
      </GenericModal>
    </div>
  );
};

export default TimeLimitBox;
