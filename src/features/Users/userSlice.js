import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchUserInfo,
  handleLike,
  updateUserInfo,
  fetchUserLikedPosts,
  fetchSinglePost,
  editPost,
  addComment,
  deleteComment,
  editComment,
} from "../../services";

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
      toast.success("Updated Details Successfully");
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

    // handling edit post from single post page
    builder.addCase(
      editPost.fulfilled,
      (state, { payload: { media, postDescription } }) => {
        state.singlePost.postDescription = postDescription;
        state.singlePost.media = media;
      }
    );

    // Removes the post from liked posts when unliked from there otherwise stays as it is
    builder.addCase(
      handleLike.fulfilled,
      (state, { payload: { isLiked, postId, uid } }) => {
        state.likedPosts = isLiked
          ? state.likedPosts.filter((post) => post.postId !== postId)
          : state.likedPosts;

        state.bookmarks = state.bookmarks.map((post) =>
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

    builder.addCase(handleLike.rejected, (_, { payload }) => {
      toast.error(payload);
    });

    // adding comment from single post page

    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      state.singlePost = { ...state.singlePost, comments: payload.newComments };
    });

    // delete comment from single post page
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.singlePost = { ...state.singlePost, comments: payload.newComments };
    });
    // update comment from single post page
    builder.addCase(editComment.fulfilled, (state, { payload }) => {
      state.singlePost = { ...state.singlePost, comments: payload.newComments };
    });
  },
});

export default userSlice.reducer;
