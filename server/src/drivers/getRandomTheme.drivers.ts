import ErrStr from "../domain/ErrStr.domain";
import { Theme } from "../generated/graphql";
import { FireStoreApp } from "./firebase.drivers";
import { doc, getDoc } from "firebase/firestore";
import { ErrsEnumeration } from "../util/err.util";

export const GetRandomThemeDriver = async (
  randomIndex: number
): Promise<[Theme | null, ErrStr]> => {
  const db = FireStoreApp;

  try {
    const docRef = doc(db, "themes", `theme_${randomIndex}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return [docSnap.data() as Theme, new ErrStr({ isErr: false })];
    } else {
      throw new Error(ErrsEnumeration.DOC_NOT_FOUND);
    }
  } catch (e: unknown) {
    return [null, new ErrStr({ isErr: true, errStr: (e as Error).message })];
  }
};
