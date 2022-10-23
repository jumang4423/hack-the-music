import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import Spacer from "../../../components/Spacer";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { RandomThemeEanbleCheckboxHandleChange } from "./fun_RandomTheme";
import { Button } from "@mui/material";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const RandomTheme = ({ gameSettings, setGameSettings }: Props) => {
  return (
    <div>
      <h3
        style={{
          marginTop: "-10px",
          marginBottom: "4px",
        }}
      >
        ## Random Theme
      </h3>

      <FormControlLabel
        control={
          <Checkbox
            checked={gameSettings.randomTheme.enabled}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              RandomThemeEanbleCheckboxHandleChange(
                event,
                gameSettings,
                setGameSettings
              );
            }}
          />
        }
        label="enable"
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            margin: "8px",
          }}
        >
          <Button variant="outlined">＋ manually add</Button>
        </div>
        <div
          style={{
            margin: "8px",
          }}
        >
          <Button variant="contained">🌏 random</Button>
        </div>
      </div>
    </div>
  );
};

export default RandomTheme;
