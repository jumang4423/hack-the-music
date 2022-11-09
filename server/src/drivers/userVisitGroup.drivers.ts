import { User } from "../generated/graphql";
import { FireStoreApp } from "./firebase.drivers";
import ErrStr from "../domain/ErrStr.domain";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ErrsEnumeration } from "../util/err.util";

export const UserVisitGroupDriver = async (
  userId: string,
  groupId: string
): Promise<[User | null, ErrStr]> => {
  const db = FireStoreApp;

  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(ErrsEnumeration.NO_SUCH_USER_IN_FS);
    }
    const user = docSnap.data() as User;
    const newArr = [...user.accessedGroupIDs, groupId];
    await updateDoc(docRef, {
      accessedGroupIDs: newArr,
    });

    return [{ ...user, accessedGroupIDs: newArr }, new ErrStr({})];
  } catch (err: unknown) {
    return [null, new ErrStr({ isErr: true, errStr: (err as Error).message })];
  }
};
