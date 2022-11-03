import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import {
  RandomImagesEnableCheckboxHandleChange,
  RandomImageDataHandle,
} from "./fun_RandomImage";
import { useMutation } from "@apollo/client";
import { GET_RANDOM_IMAGE } from "../../../fun/apis";
import GenericModal from "../../../components/GenericModal";
import HackyButton from "../../../components/HackyButton";
import ImageInputBox from "./ImageInputBox";
import ImageUploaderModal from "./ImageUploaderModal";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const RandomImage = ({ gameSettings, setGameSettings }: Props) => {
  const [GetImage, { loading }] = useMutation(GET_RANDOM_IMAGE, {
    onCompleted({ randomImage }) {
      RandomImageDataHandle(randomImage, gameSettings, setGameSettings);
    },
  });

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
        🎨 Random Image
      </h3>

      <FormControlLabel
        style={{
          marginTop: "-10px",
        }}
        control={
          <Checkbox
            checked={gameSettings.randomImages.enabled}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              RandomImagesEnableCheckboxHandleChange(
                event,
                gameSettings,
                setGameSettings
              );
            }}
          />
        }
        label="enabled"
      />

      <div hidden={!gameSettings.randomImages.enabled}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginTop: "-10px",
            marginBottom: "20px",
          }}
        >
          {gameSettings.randomImages.images.map((_, index: number) => {
            return (
              <div key={index}>
                <ImageInputBox
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
            hidden={gameSettings.randomImages.images.length >= 5}
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
            hidden={gameSettings.randomImages.images.length >= 5}
          >
            <HackyButton
              prefer={true}
              name={loading ? "loading..." : "🌏 random image"}
              onClick={() => {
                GetImage();
              }}
            />
          </div>
        </div>

        <GenericModal
          open={open}
          title={"🚢 upload image file"}
          handleClose={handleClose}
          gameSettings={gameSettings}
          setGameSettings={setGameSettings}
        >
          <ImageUploaderModal
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
            onClose={handleClose}
          />
        </GenericModal>
      </div>
    </div>
  );
};

export default RandomImage;
