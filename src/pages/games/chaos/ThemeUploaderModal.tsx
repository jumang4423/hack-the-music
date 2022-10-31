import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Button } from "@mui/material";
import InputSimpler from "../../../components/InputSimpler";
import { useCookies } from "react-cookie";
import { Cookie } from "universal-cookie";

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
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState<string>("");
  const [themeError, setThemeError] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [cookies] = useCookies();

  const onThemeUpload = async (cookie: Cookie) => {
    if (theme === "") {
      setThemeError(true);
      return;
    }
    setThemeError(false);
    setIsUploading(true);
    // TODO: mutate to the server
    const newGameSettings = Object.assign({}, gameSettings);
    newGameSettings.randomTheme.themes.push({
      content: theme,
      description,
      idUploadedBy: cookie.userId,
    });
    setGameSettings(newGameSettings);
    setIsUploading(false);

    onClose();
  };

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
            onThemeUpload(cookies);
          }}
        >
          {isUploading ? "uploading..." : "upload"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default ThemeUploaderModal;
