import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import postReducer from "../features/Posts/postSlice";
import userReducer from "../features/Users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    user: userReducer,
  },
});
