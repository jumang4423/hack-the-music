import { useEffect, useState } from "react";
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
import { NetworkStatus } from "@apollo/client";
type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const RandomTheme = ({ gameSettings, setGameSettings }: Props) => {
  const [GetTheme, { client, loading }] = useMutation(GET_RANDOM_THEME, {
    onCompleted({ randomTheme }) {
      RandomThemeDataHandle(randomTheme, gameSettings, setGameSettings);
    },
  });

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
        label="enable"
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
              marginTop: "0",
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
                margin: "4px",
              }}
              hidden={gameSettings.randomTheme.themes.length >= 5}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  RandomThemeManuallyAddButtonHandleClick(
                    gameSettings,
                    setGameSettings
                  )
                }
              >
                ＋ manually add
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
                {loading ? "loading" : "🌏 random"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomTheme;
