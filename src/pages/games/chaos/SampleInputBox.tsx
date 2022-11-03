import Player from "../../../components/HitMusicPlayer";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { FileNameFromPath } from "../../../fun/fileNameFromPath";

type Props = {
  index: number;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const SampleInputBox = ({ index, gameSettings, setGameSettings }: Props) => {
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

      <Player url={gameSettings.randomSamples.samples[index].url} />

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
          }}
        >
          <h3>
            {index + 1}. {gameSettings.randomSamples.samples[index].description}
          </h3>
        </div>
        <div
          style={{
            marginTop: "-18px",
            fontSize: "13px",
            color: "grey",
          }}
        >
          * {FileNameFromPath(gameSettings.randomSamples.samples[index].url)}
        </div>
      </div>
    </div>
  );
};

export default SampleInputBox;
