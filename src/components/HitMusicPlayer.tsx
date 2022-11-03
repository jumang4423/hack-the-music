import { useSound } from "use-sound";

type PlayerProps = {
  url: string | string[];
};

const HitMusicPlayer = ({ url }: PlayerProps) => {
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

export default HitMusicPlayer;
