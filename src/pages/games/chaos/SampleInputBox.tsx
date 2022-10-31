import InputSimpler from "../../../components/InputSimpler";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { FileNameFromPath } from "../../../fun/fileNameFromPath";
import { useSound } from "use-sound";

type PlayerProps = {
  url: string;
};

const Player = ({ url }: PlayerProps) => {
  const [play, { stop }] = useSound(url, { volume: 0.5 });

  return (
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
      onMouseLeave={() => stop()}
    >
      <div
        style={{
          background: "#f5f5f5",
          width: "32px",
          height: "32px",
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => play()}
      >
        p
      </div>
    </div>
  );
};

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
            {index + 1}.{" "}
            {FileNameFromPath(gameSettings.randomSamples.samples[index].url)}
          </h3>
        </div>
        <div
          style={{
            marginTop: "-18px",
            fontSize: "13px",
            color: "grey",
          }}
        >
          * {gameSettings.randomSamples.samples[index].description}
        </div>
      </div>
    </div>
  );
};

export default SampleInputBox;
