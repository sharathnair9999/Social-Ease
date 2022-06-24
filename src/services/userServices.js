import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfile } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase-config";
import { constants } from "../helpers";
import {
  userDocQuerybyId,
  userLikedPostsQuery,
  postByIdRef,
  queryUserCollection,
} from "./firebaseQueries";

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

export const fetchSuggestions = createAsyncThunk(
  `user/fetchSuggestions`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { uid },
      } = getState();
      const usersSnap = await getDocs(queryUserCollection);
      const allUsers = [];
      usersSnap.forEach((userSnap) => {
        allUsers.push({ uid: userSnap.id, ...userSnap.data() });
      });
      return { allUsers, uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetching the user profile information

export const fetchLoggedUserInfo = createAsyncThunk(
  `user/fetchLoggedUserInfo`,
  async (profileId, { rejectWithValue }) => {
    try {
      const userSnap = await getDoc(userDocQuerybyId(profileId));
      if (!userSnap.exists()) {
        return rejectWithValue({ validUser: false });
      }

      return { uid: userSnap.id, ...userSnap.data(), loggedUser: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchOtherUserInfo = createAsyncThunk(
  `user/fetchOtherUserInfo`,
  async (profileId, { rejectWithValue }) => {
    try {
      const userSnap = await getDoc(userDocQuerybyId(profileId));
      if (!userSnap.exists()) {
        return rejectWithValue({ validUser: false });
      }

      // returns everything except bookmarks and likes of the user as the profile that we visited is not logged in user's profile
      return {
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
        coverPhoto: userSnap.data().coverPhoto,
        likedPosts: [],
        loggedUser: false,
      };
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
        coverPhoto: details.coverPhoto,
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
        coverPhoto: details.coverPhoto,
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
// Add post to bookmarks

export const isPostBookmarked = async (postId, uid) => {
  const userSnap = await getDoc(userDocQuerybyId(uid));
  if (userSnap.exists()) {
    const myBookmarks = userSnap.data().bookmarks;
    const flag = myBookmarks.some((post) => post === postId);

    return flag;
  } else {
    toast.error("No Such Document Found");
    return null;
  }
};

export const handleBookmark = createAsyncThunk(
  "posts/handleBookmark",
  async (postInfo, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { uid },
      } = getState();
      const isBookmarked = await isPostBookmarked(postInfo.postId, uid);
      await updateDoc(userDocQuerybyId(uid), {
        bookmarks: isBookmarked
          ? arrayRemove(postInfo.postId)
          : arrayUnion(postInfo.postId),
      });
      return { isBookmarked, postInfo, uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// fetch all bookmarked Posts of a user

export const fetchBookmarkedPosts = createAsyncThunk(
  `user/fetchUserBookmarkedPosts`,
  async (profileId, { rejectWithValue }) => {
    try {
      let bookmarkPosts = [];
      const userSnapshot = await getDoc(userDocQuerybyId(profileId));
      const bookmarkIds = userSnapshot.data().bookmarks;
      for await (const postId of bookmarkIds) {
        const bookmarkPostSnapshot = await getDoc(postByIdRef(postId));
        if (bookmarkPostSnapshot.exists()) {
          const authorInfo = await getDoc(
            userDocQuerybyId(bookmarkPostSnapshot.data().uid)
          );
          bookmarkPosts.push({
            postId: bookmarkPostSnapshot.id,
            displayName: authorInfo.data().displayName,
            photoURL: authorInfo.data().photoURL,
            username: authorInfo.data().username,
            ...bookmarkPostSnapshot.data(),
            postAvailable: true,
          });
        } else {
          bookmarkPosts.push({
            postId: bookmarkPostSnapshot.id,
            displayName: "Unknown User",
            photoURL: constants.imgUrls.userPlaceholder,
            username: "unknown",
            ...bookmarkPostSnapshot.data(),
            postAvailable: false,
          });
        }
      }
      return bookmarkPosts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Follow a user

export const followHandler = createAsyncThunk(
  `user/followHandler`,
  async ({ personId, user }, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { uid, isLoggedIn },
        user: {
          loggedUser: { following },
        },
      } = getState();

      if (!isLoggedIn) {
        return rejectWithValue("Please Login to Proceed");
      }

      const isFollowing = following.some((user) => user === personId);

      await updateDoc(doc(db, "users", uid), {
        following: isFollowing ? arrayRemove(personId) : arrayUnion(personId),
      });
      await updateDoc(doc(db, "users", personId), {
        followers: isFollowing ? arrayRemove(uid) : arrayUnion(uid),
      });
      return { isFollowing, personId, uid, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchUsers = async (term, setter) => {
  try {
    const q = query(
      collection(db, "users"),
      where("username", ">=", term.toLowerCase()),
      where("username", "<=", term.toLowerCase() + "\uf8ff")
    );
    setter((state) => ({ ...state, fetchStatus: "FETCHING" }));
    const usersSnapshot = await getDocs(q);
    setter((state) => ({ ...state, fetchStatus: "FETCHED" }));
    const searchedUsers = [];
    usersSnapshot.forEach((user) =>
      searchedUsers.push({ uid: user.id, ...user.data() })
    );
    setter((state) => ({ ...state, data: searchedUsers }));
  } catch (error) {
    setter((state) => ({ ...state, fetchStatus: "NOT_FETCHING" }));
    toast.error(error.message);
  }
};
