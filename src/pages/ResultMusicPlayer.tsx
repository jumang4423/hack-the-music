import { UploadedMusic } from "./GameModal";
import HitMusicPlayer from "../components/HitMusicPlayer";
import Downloader from "../components/Downloader";
import { getDatabase, ref, set } from "firebase/database";
import { Group } from "../gql/graphql";

type Props = {
  music: UploadedMusic;
  index: number;
  group: Group;
};

const OnPlusChange = (music: UploadedMusic, groupId: string) => {
  const db = getDatabase();
  set(ref(db, `groups/${groupId}/results/${music.musicId}`), music);
};

const ResultMusicPlayer = ({ music, index, group }: Props) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "-18px",
        }}
      >
        <Downloader url={music.url} />

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
              width: "64px",
              height: "32px",
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "-8px",
            }}
            onClick={() => {
              OnPlusChange({ ...music, love: music.love + 1 }, group.groupId);
            }}
          >
            💖 +{music.love}
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
              width: "64px",
              height: "32px",
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "24px",
            }}
            onClick={() => {
              OnPlusChange(
                { ...music, surprised: music.surprised + 1 },
                group.groupId
              );
            }}
          >
            ⚡️ +{music.surprised}
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
              width: "64px",
              height: "32px",
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "48px",
            }}
            onClick={() => {
              OnPlusChange({ ...music, crazy: music.crazy + 1 }, group.groupId);
            }}
          >
            😎 +{music.crazy}
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
              width: "64px",
              height: "32px",
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "74px",
            }}
            onClick={() => {
              OnPlusChange(
                { ...music, beautiful: music.beautiful + 1 },
                group.groupId
              );
            }}
          >
            🌸 +{music.beautiful}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultMusicPlayer;
