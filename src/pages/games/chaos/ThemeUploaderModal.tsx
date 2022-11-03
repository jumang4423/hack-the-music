import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Button } from "@mui/material";
import InputSimpler from "../../../components/InputSimpler";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { INSERT_THEME } from "../../../fun/apis";
import {
  OnThemeFetch,
  ThemeUploaderFormvalidation,
} from "./fun_ThemeUploaderModal";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  onClose: () => void;
};

const ThemeUploaderModal = ({
  gameSettings,
  setGameSettings,
  onClose,
}: Props) => {
  const [cookies] = useCookies();
  const [InsertTheme, { loading }] = useMutation(INSERT_THEME, {
    onCompleted({ uploadTheme }) {
      OnThemeFetch(uploadTheme, gameSettings, setGameSettings, onClose);
    },
    onError(error) {
      console.log(error);
    },
  });
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState<string>("");
  const [themeError, setThemeError] = useState<boolean>(false);

  return (
    <div style={{}}>
      <DialogContent dividers>
        <div>upload your theme to the cloud!</div>
        <div>everyone randomly accesses your theme one day</div>
        <div>* do not upload a theme not made by you, please</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "30px 0px 10px 0px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputSimpler
              title=""
              placeholder="theme"
              value={theme}
              fullWidth={true}
              error={themeError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTheme(e.target.value);
              }}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputSimpler
              title=""
              placeholder="theme description"
              value={description}
              fullWidth={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            ThemeUploaderFormvalidation(theme, setThemeError) &&
              OnThemeFetch(
                {
                  content: theme,
                  description: description,
                  idUploadedBy: "",
                },
                gameSettings,
                setGameSettings,
                onClose
              );
          }}
        >
          just locally
        </Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={() => {
            ThemeUploaderFormvalidation(theme, setThemeError) &&
              InsertTheme({
                variables: {
                  content: theme,
                  description: description,
                  idUploadedBy: cookies.userId ?? "anonymous",
                },
              });
          }}
        >
          {loading ? "uploading..." : "upload"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default ThemeUploaderModal;
