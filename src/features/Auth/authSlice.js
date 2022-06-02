import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  username: "",
  photoURL: "",
  isLoggedIn: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { displayName, uid, email, photoURL, username } = action.payload;
      state.displayName = displayName;
      state.uid = uid;
      state.email = email;
      state.photoURL = photoURL;
      state.isLoggedIn = true;
      state.username = username;
    },
    logoutUser: (state) => {
      state.displayName = "";
      state.isLoggedIn = false;
      state.email = "";
      state.photoURL = "";
      state.uid = "";
      state.username = "";
    },
    updateProfileAction: (state, action) => {
      const { displayName, photoURL } = action.payload;
      state.displayName = displayName;
      state.photoURL = photoURL;
    },
  },
});

export const { loginAction, logoutUser, updateProfileAction } =
  authSlice.actions;

export default authSlice.reducer;
