import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { ChaosGameSettingsType } from "../../models/chaosGameType";
import { Button } from "@mui/material";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  onClose: () => void;
};

const TimeLimitModal = ({ gameSettings, setGameSettings, onClose }: Props) => {
  const [timeLimit, setTimeLimit] = useState<number>(gameSettings.timeLimitMin);
  const [limitError, setLimitError] = useState<boolean>(false);

  return (
    <div style={{}}>
      <DialogContent dividers>
        <TextField
          id="time-limit"
          label="Time Limit"
          type="number"
          value={timeLimit}
          onChange={(e) => {
            setTimeLimit(parseInt(e.target.value));
          }}
          error={limitError}
          helperText={
            limitError ? "Time limit must be between 10 and 300 minutes" : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (timeLimit < 10 || timeLimit > 300) {
              setLimitError(true);
            } else {
              setGameSettings({ ...gameSettings, timeLimitMin: timeLimit });
              setLimitError(false);
              onClose();
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default TimeLimitModal;
