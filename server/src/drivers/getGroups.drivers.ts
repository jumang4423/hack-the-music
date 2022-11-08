import { Group } from "../generated/graphql";
import { FireStoreApp } from "./firebase.drivers";
import ErrStr from "../domain/ErrStr.domain";
import { getDocs, query, where, collection } from "firebase/firestore";

export const GetGroupsDriver = async (
  groupIds: string[]
): Promise<[Array<Group>, ErrStr]> => {
  const db = FireStoreApp;

  try {
    const docRef = collection(db, "groups");
    const q = query(docRef, where("__name__", "in", groupIds));
    const querySnapshot = await getDocs(q);
    const groups = querySnapshot.docs.map((doc) => doc.data() as Group);
    return [groups, new ErrStr({})];
  } catch (err: unknown) {
    return [[], new ErrStr({ isErr: true, errStr: (err as Error).message })];
  }
};
