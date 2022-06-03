import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, handleLike, updateUserInfo } from "../../services";
import { fetchUserLikedPosts } from "../../services/userServices";

const initialState = {
  uid: "",
  userLoading: false,
  validUser: true,
  displayName: "",
  photoURL: "",
  username: "",
  posts: [],
  followers: [],
  following: [],
  bookmarks: [],
  gender: "",
  joinedAt: "",
  link: "",
  bio: "",
  error: "",
  likedPosts: [],
  likedPostsLoading: false,
  likedPostsError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      state.userLoading = false;
      state.validUser = true;
      state.bookmarks = payload.bookmarks;
      state.uid = payload.uid;
      state.likedPosts = payload.likedPosts;
      state.followers = payload.followers;
      state.following = payload.following;
      state.joinedAt = payload.joinedAt;
      state.bio = payload.bio;
      state.link = payload.link;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.username = payload.username;
      state.posts = payload.posts;
    });
    builder.addCase(fetchUserInfo.rejected, (state, { payload }) => {
      state.userLoading = false;
      state.error = payload;
    });

    // updating user profile information
    builder.addCase(updateUserInfo.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      state.userLoading = false;
      state.bio = payload.bio;
      state.link = payload.link;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.username = payload.username;
    });
    builder.addCase(updateUserInfo.rejected, (state, { payload }) => {
      state.userLoading = false;
      state.error = payload;
    });

    // get all posts the current logged in user has liked
    builder.addCase(fetchUserLikedPosts.pending, (state) => {
      state.likedPostsLoading = true;
    });
    builder.addCase(fetchUserLikedPosts.fulfilled, (state, { payload }) => {
      state.likedPostsLoading = false;
      state.likedPosts = payload;
    });
    builder.addCase(fetchUserLikedPosts.rejected, (state, { payload }) => {
      state.likedPostsLoading = false;
      state.likedPostsError = payload;
    });

    // Removes the post from liked posts when unliked from there otherwise stays as it is
    builder.addCase(
      handleLike.fulfilled,
      (state, { payload: { isLiked, postId } }) => {
        state.likedPosts = isLiked
          ? state.likedPosts.filter((post) => post.postId !== postId)
          : state.likedPosts;
      }
    );
  },
});

export default userSlice.reducer;
