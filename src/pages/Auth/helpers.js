import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
const provider = new GoogleAuthProvider();

export const userNameExists = async (text, setter) => {
  try {
    const q = query(collection(db, "users"));
    const docSnap = await getDocs(q);

    const allUsers = [];

    docSnap.forEach((doc) => {
      allUsers.push({ id: doc.id, ...doc.data() });
    });

    const isExistingUsername = allUsers.some(
      ({ username }) => username === text
    );

    if (isExistingUsername) {
      setter(false);
      console.log("existing");
    } else {
      console.log("not existing");
      setter(true);
    }
  } catch (error) {
    console.log("Could not check");
  }
};

const userExists = async (text) => {
  try {
    const q = query(collection(db, "users"));
    const docSnap = await getDocs(q);

    const allUsers = [];

    docSnap.forEach((doc) => {
      allUsers.push(doc.id);
    });

    const isExistingUser = allUsers.some((user) => user === text);

    if (isExistingUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const signupUser = async (e, navigate, { ...details }) => {
  e.preventDefault();
  const {
    user: {
      auth: { currentUser },
    },
  } = await createUserWithEmailAndPassword(
    auth,
    details.email,
    details.password
  );
  await updateProfile(currentUser, {
    displayName: details.displayName,
    photoURL: details.photoURL,
    gender: details.gender,
    username: details.username,
  });

  await setDoc(doc(db, "users", currentUser.uid), {
    ...details,
  });
  navigate("/login");
};

export const googleSignInHandler = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("userDetails", JSON.stringify(user));
    const existingUser = await userExists(user.uid);
    if (!existingUser) {
      await updateProfile(user, {
        displayName: user.displayName,
        photoURL: user.photoURL,
        gender: "NA",
        username: user.email.split("@")[0],
      });
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL,
        gender: "NA",
        username: user.email.split("@")[0],
        posts: [],
        followers: [],
        following: [],
        likedPosts: [],
      });
      toast.success(`Hi ${user.displayName}`);
    } else {
      toast.success(`Welcome ${user.displayName}`);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};
