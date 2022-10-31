import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import ThemeInputBox from "./ThemeInputBox";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import {
  RandomThemeEanbleCheckboxHandleChange,
  RandomThemeManuallyAddButtonHandleClick,
  RandomThemeDataHandle,
} from "./fun_RandomTheme";
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { GET_RANDOM_THEME } from "../../../fun/apis";
import { useCookies } from "react-cookie";
import UploaderModal from "../../../components/UploaderModal";
import ThemeUploaderModal from "./ThemeUploaderModal";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const RandomTheme = ({ gameSettings, setGameSettings }: Props) => {
  const [GetTheme, { loading }] = useMutation(GET_RANDOM_THEME, {
    onCompleted({ randomTheme }) {
      RandomThemeDataHandle(randomTheme, gameSettings, setGameSettings);
    },
  });
  const [cookies, setCookie, removeCookie] = useCookies();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h3
        style={{
          marginTop: "-10px",
          marginBottom: "16px",
        }}
      >
        🌈 Random Theme
      </h3>

      <FormControlLabel
        style={{
          marginTop: "-10px",
        }}
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
        label="enabled"
      />

      {gameSettings.randomTheme.enabled && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginTop: "-10px",
              marginBottom: "20px",
            }}
          >
            {gameSettings.randomTheme.themes.map((_, index: number) => {
              return (
                <div key={index}>
                  <ThemeInputBox
                    index={index}
                    gameSettings={gameSettings}
                    setGameSettings={setGameSettings}
                  />
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                margin: "4px 4px 4px 0px",
              }}
              hidden={gameSettings.randomTheme.themes.length >= 5}
            >
              <Button variant="outlined" onClick={() => setOpen(true)}>
                ＋
              </Button>
            </div>
            <div
              style={{
                margin: "8px",
              }}
              hidden={gameSettings.randomTheme.themes.length >= 5}
            >
              <Button
                variant="contained"
                onClick={() => {
                  try {
                    GetTheme();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {loading ? "loading" : "🌏 random theme"}
              </Button>
            </div>
          </div>
          <UploaderModal
            open={open}
            title={"🚢 upload theme"}
            handleClose={handleClose}
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
          >
            <div>
              <ThemeUploaderModal
                gameSettings={gameSettings}
                setGameSettings={setGameSettings}
                onClose={handleClose}
              />
            </div>
          </UploaderModal>
        </div>
      )}
    </div>
  );
};

export default RandomTheme;
