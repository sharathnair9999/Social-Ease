import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { capitalize } from "../helpers/constants";
const provider = new GoogleAuthProvider();

export const logout = async () => {
  await signOut(auth);
};

export const userNameExists = async (text, setter, isUpdating, prevValue) => {
  try {
    const q = query(collection(db, "users"));
    const docSnap = await getDocs(q);

    const allUsers = [];

    docSnap.forEach((doc) => {
      allUsers.push({ id: doc.id, username: doc.data().username });
    });

    const isExistingUsername = isUpdating
      ? allUsers
          .filter(
            ({ username }) => username.toLowerCase() !== prevValue.toLowerCase()
          )
          .some(({ username }) => username.toLowerCase() === text.toLowerCase())
      : allUsers.some(
          ({ username }) => username.toLowerCase() === text.toLowerCase()
        );

    if (isExistingUsername) {
      setter(false);
    } else {
      setter(true);
    }
  } catch (error) {
    toast.error(error.message);
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
  });

  await setDoc(doc(db, "users", currentUser.uid), {
    displayName: details.displayName,
    photoURL: details.photoURL,
    gender: details.gender,
    username: details.username,
    posts: [],
    followers: [],
    following: [],
    likedPosts: [],
    bookmarks: [],
    bio: "",
    link: "",
    joinedAt: serverTimestamp(),
  });
  toast.success(
    `Welcome to SocialEase Fam, ${capitalize(details.displayName)}`
  );
  navigate("/login");
};

export const loginUser = async (e, enteredEmail, password) => {
  e.preventDefault();
  try {
    const {
      user: { displayName },
    } = await signInWithEmailAndPassword(auth, enteredEmail, password);
    toast.success(`Welcome Back ${capitalize(displayName)}!`);
  } catch (error) {
    toast.error(error.message);
  }
};

export const googleSignInHandler = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const existingUser = await userExists(user.uid);
    if (!existingUser) {
      await updateProfile(user, {
        displayName: user.displayName,
        photoURL: user.photoURL,
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
        bookmarks: [],
        bio: "",
        link: "",
        joinedAt: serverTimestamp(),
      });
      toast.success(`Hi ${capitalize(user.displayName)}`);
    } else {
      toast.success(`Welcome ${capitalize(user.displayName)}`);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
