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
  followHandler,
  fetchSuggestions,
} from "../../services";
import { logoutUser } from "../Auth/authSlice";

const initialState = {
  otherUser: {
    uid: "",
    displayName: "",
    photoURL: "",
    username: "",
    posts: [],
    followers: [],
    following: [],
    gender: "",
    joinedAt: "",
    link: "",
    bio: "",
    error: "",
    validUser: "",
  },

  suggestions: [],

  loggedUser: {
    uid: "",
    validUser: "",
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
  },

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
    builder.addCase(fetchSuggestions.fulfilled, (state, { payload }) => {
      state.suggestions = payload.allUsers.filter(
        (person) => !person.followers.some((p) => p === payload.uid)
      );
    });
    builder.addCase(fetchSuggestions.rejected, (state, payload) => {
      toast.error(payload);
    });

    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      if (payload.loggedUser) {
        state.loggedUser.validUser = true;
        state.loggedUser.bookmarks = payload.bookmarks;
        state.loggedUser.uid = payload.uid;
        state.loggedUser.likedPosts = payload.likedPosts;
        state.loggedUser.followers = payload.followers;
        state.loggedUser.following = payload.following;
        state.loggedUser.joinedAt = payload.joinedAt;
        state.loggedUser.bio = payload.bio;
        state.loggedUser.link = payload.link;
        state.loggedUser.displayName = payload.displayName;
        state.loggedUser.photoURL = payload.photoURL;
        state.loggedUser.username = payload.username;
        state.loggedUser.posts = payload.posts;
      } else {
        state.otherUser.validUser = true;
        state.otherUser.uid = payload.uid;
        state.otherUser.likedPosts = payload.likedPosts;
        state.otherUser.followers = payload.followers;
        state.otherUser.following = payload.following;
        state.otherUser.joinedAt = payload.joinedAt;
        state.otherUser.bio = payload.bio;
        state.otherUser.link = payload.link;
        state.otherUser.displayName = payload.displayName;
        state.otherUser.photoURL = payload.photoURL;
        state.otherUser.username = payload.username;
        state.otherUser.posts = payload.posts;
      }
    });
    builder.addCase(fetchUserInfo.rejected, (state, { payload }) => {
      state.loggedUser.validUser = false;
      state.otherUser.validUser = false;
      state.loggedUser.error = payload;
      state.otherUser.error = payload;
    });

    // updating user profile information
    builder.addCase(updateUserInfo.pending, (state) => {
      state.loggedUser.userLoading = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      state.loggedUser.userLoading = false;
      state.loggedUser.bio = payload.bio;
      state.loggedUser.link = payload.link;
      state.loggedUser.displayName = payload.displayName;
      state.loggedUser.photoURL = payload.photoURL;
      state.loggedUser.username = payload.username;
      toast.success("Updated Details Successfully");
    });
    builder.addCase(updateUserInfo.rejected, (state, { payload }) => {
      state.loggedUser.userLoading = false;
      state.loggedUser.error = payload;
    });

    // get all posts the current logged in user has liked
    builder.addCase(fetchUserLikedPosts.pending, (state) => {
      state.loggedUser.likedPostsLoading = true;
    });
    builder.addCase(fetchUserLikedPosts.fulfilled, (state, { payload }) => {
      state.loggedUser.likedPostsLoading = false;
      state.loggedUser.likedPosts = payload;
    });
    builder.addCase(fetchUserLikedPosts.rejected, (state, { payload }) => {
      state.loggedUser.likedPostsLoading = false;
      state.loggedUser.likedPostsError = payload;
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
        state.loggedUser.likedPosts = isLiked
          ? state.loggedUser.likedPosts.filter((post) => post.postId !== postId)
          : state.loggedUser.likedPosts;

        state.loggedUser.bookmarks = state.loggedUser.bookmarks.map((post) =>
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

    // follow / unfollow a user

    builder.addCase(
      followHandler.fulfilled,
      (state, { payload: { isFollowing, personId, uid, user } }) => {
        state.loggedUser.following = isFollowing
          ? state.loggedUser.following.filter((user) => user !== personId)
          : [...state.loggedUser.following, personId];
        state.otherUser.followers = isFollowing
          ? state.otherUser.followers.filter((user) => user !== uid)
          : [...state.otherUser.followers, uid];
        state.suggestions = isFollowing
          ? [...state.suggestions, user]
          : state.suggestions.filter((person) => person.uid !== personId);
      }
    );
    builder.addCase(logoutUser, (state) => {
      state.loggedUser.validUser = true;
      state.loggedUser.bookmarks = [];
      state.loggedUser.uid = "";
      state.loggedUser.likedPosts = [];
      state.loggedUser.followers = [];
      state.loggedUser.following = [];
      state.loggedUser.joinedAt = "";
      state.loggedUser.bio = "";
      state.loggedUser.link = "";
      state.loggedUser.displayName = "";
      state.loggedUser.photoURL = "";
      state.loggedUser.username = "";
      state.loggedUser.posts = [];
    });
  },
});

export default userSlice.reducer;
