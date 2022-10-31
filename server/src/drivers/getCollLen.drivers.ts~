import ErrStr from "../domain/ErrStr.domain";
import { FireStoreApp } from "./firebase.drivers";
import { collection, getCountFromServer } from "firebase/firestore";

export const GetCollLenDriver = async (
  collectionName: string
): Promise<[number, ErrStr]> => {
  const db = FireStoreApp;

  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getCountFromServer(collectionRef);
    const len = snapshot.data().count;

    return [len, new ErrStr({})];
  } catch (e: unknown) {
    return [-1, new ErrStr({ isErr: true, errStr: (e as Error).message })];
  }
};
