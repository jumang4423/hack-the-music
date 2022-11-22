import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import ThemeInputBox from "./ThemeInputBox";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import {
  RandomThemeEanbleCheckboxHandleChange,
  RandomThemeDataHandle,
} from "./fun_RandomTheme";
import { useMutation } from "@apollo/client";
import HackyButton from "../../../components/HackyButton";
import { GET_RANDOM_THEME } from "../../../fun/apis";
import { useCookies } from "react-cookie";
import GenericModal from "../../../components/GenericModal";
import ThemeUploaderModal from "./ThemeUploaderModal";
import { IsMeAdminRn } from "../../../fun/isMeAdminRn";
import { Group } from "../../../gql/graphql";

type Props = {
  group: Group;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const RandomTheme = ({ gameSettings, setGameSettings, group }: Props) => {
  const [GetTheme, { loading }] = useMutation(GET_RANDOM_THEME, {
    onCompleted({ randomTheme }) {
      RandomThemeDataHandle(randomTheme, gameSettings, setGameSettings);
    },
  });
  const [cookies] = useCookies();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const viewState = {
    isMeAdminRn: IsMeAdminRn(group),
  };

  return (
    <div>
      <h3
        style={{
          marginTop: "-16px",
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
        disabled={!viewState.isMeAdminRn}
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
            {gameSettings.randomTheme.themes.map((theme, index: number) => {
              return (
                <div key={theme.content + index}>
                  <ThemeInputBox
                    IsMeAdminRn={viewState.isMeAdminRn}
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
                margin: "0px 4px 4px 0px",
              }}
              hidden={
                gameSettings.randomTheme.themes.length >= 5 ||
                !viewState.isMeAdminRn
              }
            >
              <HackyButton
                name={"＋"}
                onClick={() => {
                  setOpen(true);
                }}
              />
            </div>
            <div
              style={{
                margin: "4px 8px 8px 8px",
              }}
              hidden={
                gameSettings.randomTheme.themes.length >= 5 ||
                !viewState.isMeAdminRn
              }
            >
              <HackyButton
                prefer={true}
                name={loading ? "loading..." : "🌏 random theme"}
                isDisabled={loading}
                onClick={() => {
                  GetTheme({
                    variables: {
                      id: cookies.id,
                    },
                  });
                }}
              />
            </div>
          </div>

          <GenericModal
            open={open}
            title={"🚢 upload theme"}
            handleClose={handleClose}
          >
            <div>
              <ThemeUploaderModal
                gameSettings={gameSettings}
                setGameSettings={setGameSettings}
                onClose={handleClose}
              />
            </div>
          </GenericModal>
        </div>
      )}
    </div>
  );
};

export default RandomTheme;
