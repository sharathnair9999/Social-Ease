import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase-config";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
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
  });
  toast.success(`Welcome to SocialEase Fam, ${details.displayName}`);
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

export const uploadFile = (file, setValid, setCredentials) => {
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress != null && progress < 100 ? setValid(false) : setValid(true);
      switch (snapshot.state) {
        case "paused":
          toast.warn("Upload is Paused");
          break;
        default:
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          toast.warn("Unauthorized Storage Access");
          break;
        case "storage/canceled":
          toast.warn("Upload Cancelled");
          break;
        case "storage/unknown":
          toast.warn("Unauthorized User. Please try later");
          break;
        default:
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((photoURL) => {
        setCredentials((state) => ({ ...state, photoURL }));
      });
    }
  );
};

export const logout = async () => {
  await signOut(auth);
};
