import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  feedPostsLoading: false,
  explorePostsLoading: false,
  bookmarkPostsLoading: false,
  userPostsLoading: false,
  bookmarkPosts: [],
  explorePosts: [],
  userPosts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
  },
});

export const { getAllPosts } = postSlice.actions;

export default postSlice.reducer;
