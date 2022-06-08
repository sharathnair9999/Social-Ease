import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard, PostSkeleton } from "../../components";
import { fetchBookmarkedPosts } from "../../services";

const Bookmarks = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const { bookmarkPosts, bookmarkPostsLoading, bookmarkPostsError } =
    useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchBookmarkedPosts(profileId));
  }, [profileId, dispatch]);

  return (
    <div className="w-full">
      {bookmarkPostsError && bookmarkPostsError}
      {bookmarkPostsLoading
        ? [...Array(5)].map((_, id) => (
            <PostSkeleton key={id} textOnly={id % 2 === 0} />
          ))
        : bookmarkPosts.length > 0
        ? bookmarkPosts.map((post) => (
            <PostCard key={post.postId} postInfo={post} bookmarkPost />
          ))
        : "You havent bookmarked anything"}
    </div>
  );
};

export default Bookmarks;
