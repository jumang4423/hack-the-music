import { useSound } from "use-sound";
import { useRecoilState } from "recoil";
import { VolumeAtom } from "../recoil/volumeAtom";

type PlayerProps = {
  url: string | string[];
};

const HitMusicPlayer = ({ url }: PlayerProps) => {
  const [volume] = useRecoilState(VolumeAtom);
  const [play, { stop }] = useSound(url, { volume });

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
