import ErrStr from "../domain/ErrStr.domain";
import { Sample } from "../generated/graphql";
import { FireStoreApp } from "./firebase.drivers";
import { doc, getDoc } from "firebase/firestore";
import { ErrsEnumeration } from "../util/err.util";

export const GetRandomSampleDriver = async (
  length: number
): Promise<[Sample | null, ErrStr]> => {
  const db = FireStoreApp;
  // 0 ~ length - 1
  const randomIndex = Math.floor(Math.random() * length);

  try {
    const docRef = doc(db, "samples", `sample_${randomIndex}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return [docSnap.data() as Sample, new ErrStr({ isErr: false })];
    } else {
      throw new Error(ErrsEnumeration.DOC_NOT_FOUND);
    }
  } catch (e: unknown) {
    return [null, new ErrStr({ isErr: true, errStr: (e as Error).message })];
  }
};
