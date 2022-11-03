import ErrStr from "../domain/ErrStr.domain";
import { Image } from "../generated/graphql";
import { FireStoreApp } from "./firebase.drivers";
import {
  doc,
  getDocs,
  query,
  where,
  collection,
  QuerySnapshot,
} from "firebase/firestore";

export const GetRandomImagesDriver = async (
  imageIndexies: Array<number>
): Promise<[Array<Image>, Array<number>, ErrStr]> => {
  const db = FireStoreApp;
  const imagesCollection = collection(db, "images");
  const IndexDocStrs: Array<string> = imageIndexies.map((index) => {
    return `image_${index}`;
  });

  try {
    const q = query(imagesCollection, where("__name__", "in", IndexDocStrs));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const imageIndexies: Array<number> = querySnapshot.docs.map((doc) => {
      // TODO: this is ugliest as hell, function to utils
      return Number(doc.id.split("_")[1]);
    });
    const images: Array<Image> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data as Image;
    });

    return [images, imageIndexies, new ErrStr({})];
  } catch (e: unknown) {
    return [[], [], new ErrStr({ isErr: true, errStr: (e as Error).message })];
  }
};
