import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addComment,
  addNewPost,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  fetchBookmarkedPosts,
  fetchExplorePosts,
  fetchFeedPosts,
  fetchUserPosts,
  followHandler,
  handleBookmark,
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

  // User posts state
  userPosts: [],
  userPostsLoading: false,
  userPostsError: "",

  // Bookmark posts state
  bookmarkPosts: [],
  bookmarkPostsLoading: false,
  bookmarkPostsError: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    // add new post
    builder.addCase(addNewPost.fulfilled, (state, { payload }) => {
      state.feedPosts.unshift(payload);
      state.explorePosts.unshift(payload);
      state.userPosts.unshift(payload);
    });
    builder.addCase(addNewPost.rejected, (_, { payload }) => {
      toast.error(payload);
    });

    // edit post handler
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      state.feedPosts = state.feedPosts.map((post) =>
        post.postId === payload.postId ? payload : post
      );
      state.explorePosts = state.explorePosts.map((post) =>
        post.postId === payload.postId ? payload : post
      );
    });
    builder.addCase(editPost.rejected, (_, { payload }) => {
      toast.error(payload);
    });

    // Fetching feed posts
    builder.addCase(fetchFeedPosts.pending, (state) => {
      state.feedPostsLoading = true;
    });
    builder.addCase(fetchFeedPosts.fulfilled, (state, { payload }) => {
      state.feedPosts = payload;
      state.feedPostsLoading = false;
    });
    builder.addCase(fetchFeedPosts.rejected, (state, { payload }) => {
      toast.error(payload);
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
      toast.error(payload);
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

    // Delete a post
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.explorePosts = state.explorePosts.filter(
        (post) => post.postId !== payload
      );
      state.feedPosts = state.feedPosts.filter(
        (post) => post.postId !== payload
      );
      state.userPosts = state.userPosts.filter(
        (post) => post.postId !== payload
      );
      state.bookmarkPosts = state.bookmarkPosts.filter(
        (post) => post.postId !== payload
      );
    });

    // Handle like of post
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
      }
    );
    builder.addCase(handleLike.rejected, (_, { payload }) => {
      toast.error(payload);
    });

    // get all posts the current logged in user has bookmarked
    builder.addCase(fetchBookmarkedPosts.pending, (state) => {
      state.bookmarkPostsLoading = true;
    });
    builder.addCase(fetchBookmarkedPosts.fulfilled, (state, { payload }) => {
      state.bookmarkPostsLoading = false;
      state.bookmarkPosts = payload;
    });
    builder.addCase(fetchBookmarkedPosts.rejected, (state, { payload }) => {
      state.bookmarkPostsLoading = false;
      state.bookmarkPostsError = payload;
    });

    // Handle Bookmarks
    builder.addCase(
      handleBookmark.fulfilled,
      (state, { payload: { isBookmarked, postInfo } }) => {
        state.bookmarkPosts = isBookmarked
          ? state.bookmarkPosts.filter(
              (post) => post.postId !== postInfo.postId
            )
          : [...state.bookmarkPosts, { ...postInfo }];
      }
    );

    // Add comment to a post
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      state.explorePosts = state.explorePosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.feedPosts = state.feedPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.bookmarkPosts = state.bookmarkPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.userPosts = state.userPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
    });

    // Edit Comment in a post
    builder.addCase(editComment.fulfilled, (state, { payload }) => {
      state.explorePosts = state.explorePosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.feedPosts = state.feedPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.bookmarkPosts = state.bookmarkPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.userPosts = state.userPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
    });

    // delete a comment from post
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.feedPosts = state.feedPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.explorePosts = state.explorePosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.bookmarkPosts = state.bookmarkPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
      state.userPosts = state.userPosts.map((post) =>
        post.postId === payload.postId
          ? { ...post, comments: payload.newComments }
          : post
      );
    });
    builder.addCase(deleteComment.rejected, (_, { payload }) => {
      toast.error(payload);
    });
    builder.addCase(followHandler.fulfilled, (state, { payload: { uid } }) => {
      state.feedPosts = state.feedPosts.filter((post) => post.uid === uid);
    });
    builder.addCase(followHandler.rejected, (_, { payload }) => {
      toast.error(payload);
    });
  },
});

export const { getAllPosts } = postSlice.actions;

export default postSlice.reducer;
