import { signOut, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { updateProfileAction } from "../features/Auth/authSlice";
import { auth, db } from "../firebase-config";

export const logout = async () => {
  await signOut(auth);
};

export const updateUserProfile = async (details, dispatch) => {
  try {
    const userRef = doc(db, "users", details.uid);
    await updateDoc(userRef, { ...details });
    await updateProfile(auth.currentUser, {
      photoURL: details.photoURL,
      displayName: details.displayName,
    });
    dispatch(
      updateProfileAction({
        photoURL: details.photoURL,
        displayName: details.displayName,
      })
    );
    toast.success("Updated User Information");
  } catch (error) {
    toast.error(error.message);
  }
};
