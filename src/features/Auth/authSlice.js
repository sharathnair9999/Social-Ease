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
  },
});

export const { loginAction, logoutUser } = authSlice.actions;

export default authSlice.reducer;
