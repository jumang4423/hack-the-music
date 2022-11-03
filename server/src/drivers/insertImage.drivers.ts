import ErrStr from "../domain/ErrStr.domain";
import { Image } from "../generated/graphql";
import { FireStoreApp } from "./firebase.drivers";
import { doc, setDoc } from "firebase/firestore";

export const InsertImageDriver = async (
  image: Image,
  imageGlobalLenCached: number
): Promise<[Image | null, ErrStr]> => {
  const db = FireStoreApp;
  const imageIndexName = `image_${imageGlobalLenCached}`;

  try {
    const docRef = doc(db, "images", imageIndexName);
    setDoc(docRef, image);
    return [image, new ErrStr({ isErr: false })];
  } catch (e: unknown) {
    return [null, new ErrStr({ isErr: true, errStr: (e as Error).message })];
  }
};
