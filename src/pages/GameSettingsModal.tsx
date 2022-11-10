import { ChaosGameSettingsType } from "../models/chaosGameType";
import GenericModal from "../components/GenericModal";
import BasicBruhCheckBox from "../components/BasicBruhCheckBox";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

const GameSettingsModal = ({
  gameSettings,
  setGameSettings,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  return (
    <GenericModal
      open={isModalOpen}
      handleClose={() => setIsModalOpen(false)}
      title="⛳️ game settings"
    >
      <div
        style={{
          width: "540px",
          padding: "16px",
        }}
      >
        <div>
          <BasicBruhCheckBox
            value={gameSettings.randomAdditionalThemes.enabled}
            onChange={(checked: boolean) =>
              setGameSettings({
                ...gameSettings,
                randomAdditionalThemes: {
                  ...gameSettings.randomAdditionalThemes,
                  enabled: checked,
                },
              })
            }
            name={"give additional theme to random player per 10 minutes"}
          />
        </div>
      </div>
    </GenericModal>
  );
};

export default GameSettingsModal;
