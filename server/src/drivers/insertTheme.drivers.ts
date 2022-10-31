import ErrStr from "../domain/ErrStr.domain";
import { Theme } from "../generated/graphql";
import { FireStoreApp } from "./firebase.drivers";
import { doc, setDoc } from "firebase/firestore";

export const InsertThemeDriver = async (
  theme: Theme,
  themeGlobalLenCached: number
): Promise<[Theme | null, ErrStr]> => {
  const db = FireStoreApp;
  const themeIndexName = `theme_${themeGlobalLenCached}`;

  try {
    const docRef = doc(db, "themes", themeIndexName);
    setDoc(docRef, theme);
    return [theme, new ErrStr({ isErr: false })];
  } catch (e: unknown) {
    return [null, new ErrStr({ isErr: true, errStr: (e as Error).message })];
  }
};
