import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase-config";
import {
  explorePostsQuery,
  feedPostsQuery,
  latestUserPostsQuery,
  postByIdRef,
  userDocQuerybyId,
} from "./firebaseQueries";

export const fetchFeedPosts = createAsyncThunk(
  "posts/fetchFeedPosts",
  async (uid, { rejectWithValue }) => {
    try {
      const query = feedPostsQuery(uid);
      let feedPosts = [];
      const feedPostsSnapShot = await getDocs(query);
      for await (const feedPost of feedPostsSnapShot.docs) {
        const userRef = doc(db, "users", feedPost.data().uid);
        const userSnapshot = await getDoc(userRef);
        feedPosts.push({
          postId: feedPost.id,
          displayName: userSnapshot.data().displayName,
          photoURL: userSnapshot.data().photoURL,
          username: userSnapshot.data().username,
          ...feedPost.data(),
        });
      }
      return feedPosts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchExplorePosts = createAsyncThunk(
  "posts/fetchExplorePosts",
  async (_, { rejectWithValue }) => {
    try {
      const query = explorePostsQuery;
      let explorePosts = [];
      const explorePostsSnapShot = await getDocs(query);
      for await (const explorePost of explorePostsSnapShot.docs) {
        let id = explorePost.data().uid;
        const userRef = userDocQuerybyId(id);
        const userSnapshot = await getDoc(userRef);
        explorePosts.push({
          postId: explorePost.id,
          displayName: userSnapshot.data().displayName,
          photoURL: userSnapshot.data().photoURL,
          username: userSnapshot.data().username,
          ...explorePost.data(),
        });
      }
      return explorePosts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    await updateDoc(postByIdRef(details.postId), {
      ...details,
    });
    toast.success("Updated Post Successfully");
  } catch (error) {
    toast.error("Could not update the post");
  }
};

export const deletePost = async (postId, uid) => {
  try {
    await deleteDoc(postByIdRef(postId));
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

export const isPostLiked = async (postId, uid) => {
  const userSnap = await getDoc(userDocQuerybyId(uid));
  if (userSnap.exists()) {
    const myLikes = userSnap.data().likedPosts;
    const flag = myLikes.some((post) => post === postId);

    return flag;
  } else {
    toast.error("No Such Document Found");
    return null;
  }
};

export const handleLike = createAsyncThunk(
  "posts/handleLike",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { uid },
      } = getState();
      const isLiked = await isPostLiked(postId, uid);
      await updateDoc(userDocQuerybyId(uid), {
        likedPosts: isLiked ? arrayRemove(postId) : arrayUnion(postId),
      });
      await updateDoc(postByIdRef(postId), {
        likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      });
      return { isLiked, postId, uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId, { rejectWithValue }) => {
    try {
      const postSnap = await getDoc(postByIdRef(postId));
      if (!postSnap.exists()) {
        // need to throw error here
        return rejectWithValue("This Post does not exist");
      }
      const userSnap = await getDoc(userDocQuerybyId(postSnap.data().uid));
      const postInfo = {
        postId: postSnap.id,
        ...postSnap.data(),
        displayName: userSnap.data().displayName,
        photoURL: userSnap.data().photoURL,
        username: userSnap.data().username,
      };

      return postInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (profileId, { rejectWithValue }) => {
    try {
      let userPosts = [];
      const userPostsSnapShot = await getDocs(latestUserPostsQuery(profileId));
      for await (const userPost of userPostsSnapShot.docs) {
        const userSnapshot = await getDoc(
          userDocQuerybyId(userPost.data().uid)
        );
        userPosts.push({
          postId: userPost.id,
          displayName: userSnapshot.data().displayName,
          photoURL: userSnapshot.data().photoURL,
          username: userSnapshot.data().username,
          ...userPost.data(),
        });
      }
      return userPosts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
