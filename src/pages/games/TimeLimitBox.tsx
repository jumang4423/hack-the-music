import { useState, useEffect } from "react";
import { ChaosGameSettingsType } from "../../models/chaosGameType";
import InputSimpler from "../../components/InputSimpler";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const TimeLimitBox = ({ gameSettings, setGameSettings }: Props) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // validation
    if (gameSettings.timeLimitMin <= 0) {
      setIsError(true);
    } else if (gameSettings.timeLimitMin > 300) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [gameSettings.timeLimitMin]);

  return (
    <div>
      <h2>⏳ time limit </h2>
      <div
        style={{
          width: "200px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <InputSimpler
          value={gameSettings.timeLimitMin}
          error={isError}
          onChange={(e: any) => {
            setGameSettings({
              ...gameSettings,
              timeLimitMin: parseInt(e.target.value),
            });
          }}
          type="number"
        />
        min
      </div>
    </div>
  );
};

export default TimeLimitBox;
