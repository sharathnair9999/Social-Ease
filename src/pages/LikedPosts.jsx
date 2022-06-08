import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard, PostSkeleton } from "../components";
import { fetchUserLikedPosts } from "../services";

const LikedPosts = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const {
    loggedUser: { likedPosts, likedPostsLoading, likedPostsError },
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUserLikedPosts(profileId));
  }, [profileId, dispatch]);

  return (
    <div className="w-full">
      {likedPostsError && likedPostsError}
      {likedPostsLoading
        ? [...Array(10)].map((_, id) => (
            <PostSkeleton key={id} textOnly={id % 2 === 0} />
          ))
        : likedPosts?.length > 0
        ? likedPosts?.map((post) => (
            <PostCard key={post.postId} postInfo={post} />
          ))
        : "You havent liked any posts till now"}
    </div>
  );
};

export default LikedPosts;
