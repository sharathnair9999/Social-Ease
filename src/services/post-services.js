import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase-config";

export const allPostsListener = async (dispatch, getAllPosts) => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const allPosts = [];
    querySnapshot.forEach((doc) => {
      allPosts.push({ postId: doc.id, ...doc.data() });
    });
    dispatch(getAllPosts(allPosts));
  });
  return () => unsubscribe();
};

export const addNewPost = async (details) => {
  try {
    await addDoc(collection(db, "posts"), {
      ...details,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const editPost = async (details) => {
  try {
    const postRef = doc(db, "posts", details.postId);

    await updateDoc(postRef, {
      ...details,
    });
    toast.success("Updated Post Successfully");
  } catch (error) {
    toast.error("Could not update the post");
  }
};

export const deletePost = async (id) => {
  try {
    await deleteDoc(doc(db, "posts", id));
    toast.success("Delete Post Successully");
  } catch (error) {
    toast.error(error.message);
  }
};
