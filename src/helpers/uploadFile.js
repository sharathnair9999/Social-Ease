import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../firebase-config";
import { constants } from "./constants";

export const deleteFile = async (file, setCredentials) => {
  try {
    const storageRef = ref(storage, file);
    await deleteObject(storageRef);
    setCredentials((state) => ({
      ...state,
      photoURL: [constants.imgUrls.userPlaceholder],
    }));
    console.log("deleted file");
  } catch (error) {
    toast.error("Could not delete file");
  }
  // console.log(file);
};

export const uploadFile = (file, setValid, setCredentials, isSingleFile) => {
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
        setCredentials((state) => ({
          ...state,
          photoURL: isSingleFile
            ? [photoURL]
            : [...state, [...state.photoURL, photoURL]],
        }));
      });
    }
  );
};
