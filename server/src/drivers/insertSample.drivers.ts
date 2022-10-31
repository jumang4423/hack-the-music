import ErrStr from "../domain/ErrStr.domain";
import { Sample } from "../generated/graphql";
import { FireStoreApp } from "./firebase.drivers";
import { doc, setDoc } from "firebase/firestore";

export const InsertSampleDriver = async (
  sample: Sample,
  sampleGlobalLenCached: number
): Promise<[Sample | null, ErrStr]> => {
  const db = FireStoreApp;
  const sampleIndexName = `sample_${sampleGlobalLenCached}`;

  try {
    const docRef = doc(db, "samples", sampleIndexName);
    setDoc(docRef, sample);
    return [sample, new ErrStr({ isErr: false })];
  } catch (e: unknown) {
    return [null, new ErrStr({ isErr: true, errStr: (e as Error).message })];
  }
};
