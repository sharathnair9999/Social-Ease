import { Navigate, Route, Routes } from "react-router-dom";
import { RedirectLoggedInUser } from "./helpers";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Bookmarks,
  ErrorPage,
  Explore,
  Feed,
  Login,
  MainContainer,
  People,
  Signup,
  SinglePost,
  UserProfile,
} from "./pages";
import { Footer } from "./components";

function App() {
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
            <MainContainer>
              <Feed />
            </MainContainer>
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
            <MainContainer>
              <Bookmarks />
            </MainContainer>
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
        />
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
