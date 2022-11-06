import { useState } from "react";
import Downloader from "../../../components/Downloader";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import GenericModal from "../../../components/GenericModal";

type Props = {
  index: number;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  IsMeAdminRn: boolean;
};

const ImageInputBox = ({
  index,
  gameSettings,
  setGameSettings,
  IsMeAdminRn,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const viewState = {
    descriptionPtr: gameSettings.randomImages.images[index].description,
  };
  return (
    <div
      style={{
        height: "45px",
        width: "100%",
        marginBottom: "24px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {IsMeAdminRn && (
        <div
          onClick={() => {
            const newGameSettings = { ...gameSettings };
            newGameSettings.randomImages.images.splice(index, 1);
            setGameSettings(newGameSettings);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "red",
            height: "100%",
            width: "128px",
            marginTop: "16px",
            backgroundColor: "#f5f5f5",
            marginRight: "16px",
          }}
        >
          delete
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "17px",
          }}
        >
          <img
            src={gameSettings.randomImages.images[index].url}
            width={45}
            height={45}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "64px",
          width: "64px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            background: "#f5f5f5",
            width: "32px",
            height: "32px",
            marginTop: "16px",
            marginRight: "-16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {"👁"}
        </div>
      </div>

      <Downloader url={gameSettings.randomImages.images[index].url} />

      {viewState.descriptionPtr && (
        <div
          style={{
            marginTop: "24px",
            textDecoration: "underline",
          }}
        >
          {viewState.descriptionPtr}
        </div>
      )}

      <GenericModal
        open={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
        title="image viewer"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <img src={gameSettings.randomImages.images[index].url} />
        </div>
      </GenericModal>
    </div>
  );
};

export default ImageInputBox;
