import { useSound } from "use-sound";
import { useRecoilState } from "recoil";
import { VolumeAtom } from "../recoil/volumeAtom";

export const useNoticeSound = (): (() => void) => {
  const [volume] = useRecoilState(VolumeAtom);
  const [play] = useSound("/chime.mp3", { volume });
  return play;
};
