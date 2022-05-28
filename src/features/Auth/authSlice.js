import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

// const userDetails = JSON.parse(localStorage.getItem("userDetails") ?  )

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  photoURL: "",
  isLoggedIn: false,
  error: "",
};
const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user); //will remove after configuring slice completely
  } else {
    console.log("logged out"); //will remove after configuring slice completely
  }
});

unsubscribe();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { displayName, uid, email, photoURL } = action.payload;
      state.displayName = displayName;
      state.uid = uid;
      state.email = email;
      state.photoURL = photoURL;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state = initialState;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
