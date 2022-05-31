import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
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

export const addNewPost = async (details, setDetails) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...details,
      createdAt: serverTimestamp(),
    });
  } catch (error) {}
};

export const editPost = (details, setDetails) => {
  console.log("editted post details", details); //will edit in next commit
};
