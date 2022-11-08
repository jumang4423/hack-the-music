import { ChaosGameSettingsType } from "../../../models/chaosGameType";

type Props = {
  index: number;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  IsMeAdminRn: boolean;
};

const ThemeInputBox = ({
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
            newGameSettings.randomTheme.themes.splice(index, 1);
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
          width: "60%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "12px",
            textDecoration: "underline",
          }}
        >
          {gameSettings.randomTheme.themes[index].content}
        </div>
        <div
          style={{
            marginTop: "-12px",
            fontSize: "13px",
            color: "grey",
          }}
        >
          * {gameSettings.randomTheme.themes[index].description}
          {!gameSettings.randomTheme.themes[index].description &&
            "no description"}
        </div>
      </div>
    </div>
  );
};

export default ThemeInputBox;
