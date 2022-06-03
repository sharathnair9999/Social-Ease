import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchExplorePosts,
  fetchFeedPosts,
  fetchSinglePost,
  fetchUserPosts,
  handleLike,
} from "../../services";

const initialState = {
  // Feed posts state
  feedPosts: [],
  feedPostsLoading: false,
  feedPostsError: "",

  // Explore Posts State
  explorePosts: [],
  explorePostsLoading: false,
  explorePostsError: "",

  // Bookmark posts State
  bookmarkPosts: [],
  bookmarkPostsLoading: false,
  bookmarkPostsError: "",

  // User posts state
  userPosts: [],
  userPostsLoading: false,
  userPostsError: "",

  // Single Post State
  singlePost: {
    postId: "",
    uid: "",
    postDescription: "",
    likes: [],
    comments: [],
    createdAt: null,
    media: [],
    photoURL: "",
    displayName: "",
    username: "",
  },
  singlePostLoading: false,
  singlePostError: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    // Fetching feed posts
    builder.addCase(fetchFeedPosts.pending, (state) => {
      state.feedPostsLoading = true;
    });
    builder.addCase(fetchFeedPosts.fulfilled, (state, { payload }) => {
      state.feedPosts = payload;
      state.feedPostsLoading = false;
    });
    builder.addCase(fetchFeedPosts.rejected, (state, { payload }) => {
      state.feedPostsError = payload;
      state.feedPostsLoading = false;
    });
    // Fetching explore posts
    builder.addCase(fetchExplorePosts.pending, (state) => {
      state.explorePostsLoading = true;
    });
    builder.addCase(fetchExplorePosts.fulfilled, (state, { payload }) => {
      state.explorePosts = payload;
      state.explorePostsLoading = false;
    });
    builder.addCase(fetchExplorePosts.rejected, (state, { payload }) => {
      state.explorePostsError = payload;
      state.explorePostsLoading = false;
    });
    // Fetching a user's posts
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.userPostsLoading = true;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
      state.userPostsLoading = false;
      state.userPosts = payload;
    });
    builder.addCase(fetchUserPosts.rejected, (state, { payload }) => {
      state.userPostsLoading = false;
      state.userPostsError = payload;
    });

    // Fetching Single post
    builder.addCase(fetchSinglePost.pending, ({ singlePostLoading }) => {
      singlePostLoading = true;
    });
    builder.addCase(
      fetchSinglePost.fulfilled,
      (
        { singlePost, singlePostError, singlePostLoading },
        {
          payload: {
            uid,
            postId,
            postDescription,
            comments,
            likes,
            media,
            createdAt,
            displayName,
            photoURL,
            username,
          },
        }
      ) => {
        singlePostError = "";
        singlePost.uid = uid;
        singlePost.comments = comments;
        singlePost.createdAt = createdAt;
        singlePost.postId = postId;
        singlePost.postDescription = postDescription;
        singlePost.likes = likes;
        singlePost.displayName = displayName;
        singlePost.photoURL = photoURL;
        singlePost.username = username;
        singlePost.media = media;
        singlePostLoading = false;
      }
    );
    builder.addCase(
      fetchSinglePost.rejected,
      ({ singlePostLoading, singlePostError, singlePost }, { payload }) => {
        singlePostLoading = false;
        singlePostError = payload;
        toast.error(singlePostError);
        singlePost.uid = "";
        singlePost.comments = [];
        singlePost.createdAt = "";
        singlePost.postId = "";
        singlePost.postDescription = "";
        singlePost.likes = [];
        singlePost.displayName = "";
        singlePost.photoURL = "";
        singlePost.username = "";
        singlePost.media = [];
      }
    );
    builder.addCase(
      handleLike.fulfilled,
      (state, { payload: { isLiked, postId, uid } }) => {
        state.feedPosts = state.feedPosts.map((post) =>
          post.postId === postId
            ? {
                ...post,
                likes: isLiked
                  ? post.likes.filter((user) => user !== uid)
                  : [...post.likes, uid],
              }
            : post
        );
        state.bookmarkPosts = state.bookmarkPosts.map((post) =>
          post.postId === postId
            ? {
                ...post,
                likes: isLiked
                  ? post.likes.filter((user) => user !== uid)
                  : [...post.likes, uid],
              }
            : post
        );
        state.explorePosts = state.explorePosts.map((post) =>
          post.postId === postId
            ? {
                ...post,
                likes: isLiked
                  ? post.likes.filter((user) => user !== uid)
                  : [...post.likes, uid],
              }
            : post
        );
        state.userPosts = state.userPosts.map((post) =>
          post.postId === postId
            ? {
                ...post,
                likes: isLiked
                  ? post.likes.filter((user) => user !== uid)
                  : [...post.likes, uid],
              }
            : post
        );
        state.singlePost.likes = isLiked
          ? state.singlePost.likes.filter((user) => user !== uid)
          : [...state.singlePost.likes, uid];
      }
    );
  },
});

export const { getAllPosts } = postSlice.actions;

export default postSlice.reducer;
