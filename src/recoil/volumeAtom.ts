import { atom } from "recoil";
// @ts-ignore
import Cookies from "js-cookie";

export const VolumeAtom = atom({
  key: "volumeAtom",
  default: Cookies.get("volume") ? parseFloat(Cookies.get("volume")) : 1.0,
});
