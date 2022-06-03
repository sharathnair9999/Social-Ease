import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard } from "../components";
import { fetchUserPosts } from "../services";

const UserPosts = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const { userPosts, userPostsLoading, userPostsError } = useSelector(
    (state) => state.posts
  );
  useEffect(() => {
    dispatch(fetchUserPosts(profileId));
  }, [profileId, dispatch]);

  return (
    <div className="w-full">
      {userPostsError && "Error"}
      {userPostsLoading
        ? " Loading" // will add loading gif and error gif after completing the app
        : userPosts.length > 0
        ? userPosts.map((post) => (
            <PostCard key={post.postId} postInfo={post} />
          ))
        : "No Posts Till Now"}
    </div>
  );
};

export default UserPosts;
