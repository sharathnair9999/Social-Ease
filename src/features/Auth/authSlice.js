import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  username: "",
  photoURL: "",
  isLoggedIn: false,
  error: "",
  link: "",
  bio: "",
  gender: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { displayName, uid, email, photoURL, username, link, bio, gender } =
        action.payload;
      state.displayName = displayName;
      state.uid = uid;
      state.email = email;
      state.photoURL = photoURL;
      state.isLoggedIn = true;
      state.username = username;
      state.bio = bio;
      state.link = link;
      state.gender = gender;
    },
    logoutUser: (state) => {
      state.displayName = "";
      state.isLoggedIn = false;
      state.email = "";
      state.photoURL = "";
      state.uid = "";
      state.username = "";
      state.bio = "";
      state.link = "";
      state.gender = "";
    },
    updateProfileAction: (state, action) => {
      const { displayName, photoURL, bio, link, gender } = action.payload;
      state.displayName = displayName;
      state.photoURL = photoURL;
      state.bio = bio;
      state.gender = gender;
      state.link = link;
    },
  },
});

export const { loginAction, logoutUser, updateProfileAction } =
  authSlice.actions;

export default authSlice.reducer;
