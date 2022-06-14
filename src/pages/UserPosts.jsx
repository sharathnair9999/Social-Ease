import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard, PostSkeleton } from "../components";
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
      {userPostsLoading ? (
        [...Array(10)].map((_, id) => (
          <PostSkeleton key={id} textOnly={id % 2 === 0} />
        ))
      ) : userPosts.length > 0 ? (
        userPosts.map((post) => <PostCard key={post.postId} postInfo={post} />)
      ) : (
        <p className="my-4 w-full text-center text-2xl font-bold">
          No Posts Till Now
        </p>
      )}
    </div>
  );
};

export default UserPosts;
