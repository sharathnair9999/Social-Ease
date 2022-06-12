import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute, RedirectLoggedInUser } from "./helpers";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Bookmarks,
  ErrorPage,
  Explore,
  Feed,
  LikedPosts,
  Login,
  MainContainer,
  People,
  Signup,
  SinglePost,
  UserPosts,
  UserProfile,
} from "./pages";
import { Footer } from "./components";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { loginAction, logoutUser } from "./features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import {
  fetchBookmarkedPosts,
  fetchLoggedUserInfo,
  fetchSuggestions,
} from "./services";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let { uid, photoURL, displayName, email } = user;
        const userDetails = await getDoc(doc(db, "users", uid));
        dispatch(
          loginAction({
            uid,
            photoURL,
            displayName,
            email,
            username: userDetails?.username ?? email.split("@")[0],
          })
        );
        uid && dispatch(fetchLoggedUserInfo(uid));
        dispatch(fetchBookmarkedPosts(uid));
      } else {
        dispatch(logoutUser());
      }
      dispatch(fetchSuggestions());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <ToastContainer autoClose={2500} pauseOnFocusLoss={false} />
      <Routes>
        <Route
          path="login"
          element={
            <RedirectLoggedInUser>
              <Login />
            </RedirectLoggedInUser>
          }
        />
        <Route
          path="signup"
          element={
            <RedirectLoggedInUser>
              <Signup />
            </RedirectLoggedInUser>
          }
        />
        <Route path="/" element={<Navigate to={"feed"} />} />
        <Route
          path="feed"
          element={
            <ProtectedRoute route={"/explore"}>
              <MainContainer>
                <Feed />
              </MainContainer>
            </ProtectedRoute>
          }
        />
        <Route
          path="explore"
          element={
            <MainContainer>
              <Explore />
            </MainContainer>
          }
        />
        <Route
          path="bookmarks"
          element={
            <ProtectedRoute route={"/login"}>
              <MainContainer>
                <Bookmarks />
              </MainContainer>
            </ProtectedRoute>
          }
        />
        <Route
          path="people"
          element={
            <MainContainer>
              <People />
            </MainContainer>
          }
        />
        <Route
          path="profile/:profileId"
          element={
            <MainContainer>
              <UserProfile />
            </MainContainer>
          }
        >
          <Route index element={<UserPosts />} />
          <Route
            path="bookmarks"
            element={
              <ProtectedRoute route={"/login"} onlyLoggedUserRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route
            path="likes"
            element={
              <ProtectedRoute route={"/likes"} onlyLoggedUserRoute>
                <LikedPosts />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="post/:postId"
          element={
            <MainContainer>
              <SinglePost />
            </MainContainer>
          }
        ></Route>
        <Route path="invalid" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
