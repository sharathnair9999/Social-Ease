import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
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
    const postRef = await addDoc(collection(db, "posts"), {
      ...details,
      createdAt: serverTimestamp(),
    });
    // Add the post id into the posts array of user's profile details to show in the profile page of the user
    const userRef = doc(db, "users", details.uid);
    await updateDoc(userRef, {
      posts: arrayUnion(postRef.id),
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const editPost = async (details) => {
  try {
    const postsRef = doc(db, "posts", details.postId);

    await updateDoc(postsRef, {
      ...details,
    });
    toast.success("Updated Post Successfully");
  } catch (error) {
    toast.error("Could not update the post");
  }
};

export const deletePost = async (postId, uid) => {
  try {
    await deleteDoc(doc(db, "posts", postId));
    toast.success("Delete Post Successully");
    // After deleting from the post from "posts" db, it should removed from the author's (user's) posts data
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      posts: arrayRemove(postId),
    });
  } catch (error) {
    toast.error(error.message);
  }
};
const postsRef = collection(db, "posts");
export const latestUserPostsQuery = (profileId) =>
  query(postsRef, where("uid", "==", profileId), orderBy("createdAt", "desc"));

export const queryUserCollection = query(collection(db, "users"));

export const userDocQuery = (uid) => doc(db, "users", uid);

export const universalSnapshot = (query, setter, idFieldName) =>
  onSnapshot(
    query,
    (querySnapshot) => {
      const coll = [];
      querySnapshot.forEach((doc) => {
        coll.push({
          [idFieldName]: doc.id,
          ...doc.data(),
        });
      });
      setter(coll);
    },
    (error) => {
      toast.error(error.message);
    }
  );

export const universalSnapShotDoc = (query, setter, idFieldName) =>
  onSnapshot(query, (doc) => {
    setter((state) => ({ ...state, [idFieldName]: doc.id, ...doc.data() }));
  });
