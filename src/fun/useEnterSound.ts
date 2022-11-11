import { useSound } from "use-sound";
import { useRecoilState } from "recoil";
import { VolumeAtom } from "../recoil/volumeAtom";

export const useEnterSound = (): (() => void) => {
  const [volume] = useRecoilState(VolumeAtom);
  const [play] = useSound("/enter.mp3", { volume });
  return play;
};
