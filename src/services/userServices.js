import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export const getUserInfo = async (id, setter) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  const data = { id, ...docSnap.data() };
  setter(data);
};
