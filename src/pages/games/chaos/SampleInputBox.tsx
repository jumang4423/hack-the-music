import Player from "../../../components/HitMusicPlayer";
import Downloader from "../../../components/Downloader";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { FileNameFromPath } from "../../../fun/fileNameFromPath";

type Props = {
  index: number;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  IsMeAdminRn: boolean;
};

const SampleInputBox = ({
  index,
  gameSettings,
  setGameSettings,
  IsMeAdminRn,
}: Props) => {
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
            newGameSettings.randomSamples.samples.splice(index, 1);
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
            marginRight: "0px",
          }}
        >
          delete
        </div>
      )}

      <Player url={gameSettings.randomSamples.samples[index].url} />

      <div
        style={{
          marginLeft: "-16px",
        }}
      >
        <Downloader url={gameSettings.randomSamples.samples[index].url} />
      </div>

      <div
        style={{
          width: "60%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-4px",
          }}
        >
          <h3
            style={{
              textDecoration: "underline",
              fontSize: "1.2rem",
            }}
          >
            {index + 1}. {gameSettings.randomSamples.samples[index].description}
          </h3>
        </div>
        <div
          style={{
            marginTop: "-18px",
            fontSize: "13px",
          }}
        >
          * {FileNameFromPath(gameSettings.randomSamples.samples[index].url)}
        </div>
      </div>
    </div>
  );
};

export default SampleInputBox;
