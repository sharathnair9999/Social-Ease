import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import {
  explorePostsQuery,
  feedPostsQuery,
  latestUserPostsQuery,
  postByIdRef,
  postsRef,
  userDocQuerybyId,
} from "./firebaseQueries";
import { v4 as uuid } from "uuid";

export const fetchFeedPosts = createAsyncThunk(
  "posts/fetchFeedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const query = feedPostsQuery();
      let feedPosts = [];
      const feedPostsSnapShot = await getDocs(query);
      for await (const feedPost of feedPostsSnapShot.docs) {
        const userSnapshot = await getDoc(
          userDocQuerybyId(feedPost.data().uid)
        );
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
        userSnapshot.data().displayName &&
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

export const addNewPost = createAsyncThunk(
  `posts/addNewPost`,
  async (details, { rejectWithValue, getState }) => {
    const {
      auth: { uid, displayName, username, photoURL },
    } = getState();
    try {
      const postRef = await addDoc(postsRef, {
        ...details,
        uid,
        createdAt: serverTimestamp(),
      });
      // Add the post id into the posts array of user's profile details to show in the profile page of the user

      await updateDoc(userDocQuerybyId(uid), {
        posts: arrayUnion(postRef.id),
      });
      const post = {
        postId: postRef.id,
        uid,
        ...details,
        createdAt: { seconds: Math.round(Date.now() / 1000) },
        displayName,
        username,
        photoURL,
      };
      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  `posts/editPost`,
  async ({ postDetails, postId }, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { uid, displayName, photoURL, username },
      } = getState();
      await updateDoc(postByIdRef(postId), {
        ...postDetails,
      });
      const edittedPost = {
        ...postDetails,
        postId,
        uid,
        photoURL,
        displayName,
        username,
      };
      return edittedPost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  `posts/deletePost`,
  async (postId, { getState, rejectWithValue }) => {
    const {
      auth: { uid },
    } = getState();
    try {
      await deleteDoc(postByIdRef(postId));
      await updateDoc(userDocQuerybyId(uid), {
        posts: arrayRemove(postId),
      });
      return postId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      const userSnapshot = await getDoc(userDocQuerybyId(profileId));
      const userPostsSnapShot = await getDocs(latestUserPostsQuery(profileId));
      for await (const userPost of userPostsSnapShot.docs) {
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

// add comment to a post

export const addComment = createAsyncThunk(
  `posts/addComment`,
  async ({ postId, comment, comments }, { rejectWithValue, getState }) => {
    const {
      auth: { uid },
    } = getState();
    try {
      let newComment = {
        uid,
        commentId: uuid(),
        ...comment,
      };
      let newComments = [...comments, { ...newComment }];
      await updateDoc(postByIdRef(postId), {
        comments: newComments,
      });
      return { postId, newComments };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Edit an existing comment

export const editComment = createAsyncThunk(
  `posts/editComment`,
  async ({ postId, updatedComment, comments }, { rejectWithValue }) => {
    try {
      let newComments = comments.map((prevComment) =>
        prevComment.commentId === updatedComment.commentId
          ? { ...prevComment, commentText: updatedComment.commentText }
          : prevComment
      );
      await updateDoc(postByIdRef(postId), {
        comments: newComments,
      });
      return { postId, newComments };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete a comment from a post

export const deleteComment = createAsyncThunk(
  `posts/deleteComment`,
  async ({ postId, comments }, { rejectWithValue }) => {
    try {
      await updateDoc(postByIdRef(postId), {
        comments: comments,
      });
      return { postId, newComments: comments };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
