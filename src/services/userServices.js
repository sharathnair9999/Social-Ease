import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { userDocQuerybyId, userLikedPostsQuery } from "./firebaseQueries";

export const getUserInfo = async (id, setter) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  const data = { uid: id, ...docSnap.data() };
  setter(data);
};

export const getUserDetails = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  const data = { uid: id, ...docSnap.data() };
  return data;
};

// Fetching the user profile information

export const fetchUserInfo = createAsyncThunk(
  `user/fetchUserInfo`,
  async (profileId, { rejectWithValue, getState }) => {
    const {
      auth: { uid },
    } = getState();
    try {
      const userRef = doc(db, "users", profileId);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        return rejectWithValue({ validUser: false });
      }
      if (userSnap.id === uid) {
        // returns every information about user
        return { uid: userSnap.id, ...userSnap.data() };
      } else {
        // returns everything except bookmarks and likes of the user as the profile that we visited is not logged in user's profile
        return {
          loggedUser: uid ? uid : null,
          uid: userSnap.id,
          displayName: userSnap.data().displayName,
          username: userSnap.data().username,
          photoURL: userSnap.data().photoURL,
          joinedAt: userSnap.data().joinedAt,
          followers: userSnap.data().followers,
          following: userSnap.data().following,
          gender: userSnap.data().gender,
          link: userSnap.data().link,
          bio: userSnap.data().bio,
          posts: userSnap.data().posts,
          bookmarks: [],
          likedPosts: [],
        };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update user profile information

export const updateUserInfo = createAsyncThunk(
  `user/updateUserInfo`,
  async (details, { rejectWithValue }) => {
    try {
      await updateDoc(userDocQuerybyId(details.uid), {
        photoURL: details.photoURL,
        displayName: details.displayName,
        link: details.link,
        bio: details.bio,
        gender: details.gender,
        username: details.username,
      });
      await updateProfile(auth.currentUser, {
        photoURL: details.photoURL,
        displayName: details.displayName,
      });
      return {
        photoURL: details.photoURL,
        displayName: details.displayName,
        link: details.link,
        bio: details.bio,
        gender: details.gender,
        username: details.username,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetches Posts liked by the users

export const fetchUserLikedPosts = createAsyncThunk(
  `user/fetchUserLikedPosts`,
  async (profileId, { rejectWithValue }) => {
    try {
      let userLikedPosts = [];
      const userLikedPostsSnapShot = await getDocs(
        userLikedPostsQuery(profileId)
      );
      for await (const userLikedPost of userLikedPostsSnapShot.docs) {
        const userSnapshot = await getDoc(
          userDocQuerybyId(userLikedPost.data().uid)
        );

        userLikedPosts.push({
          postId: userLikedPost.id,
          displayName: userSnapshot.data().displayName,
          photoURL: userSnapshot.data().photoURL,
          username: userSnapshot.data().username,
          ...userLikedPost.data(),
        });
      }
      return userLikedPosts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
