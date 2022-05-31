import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components";
import { getAllPosts } from "../../features/Posts/postSlice";
import { allPostsListener } from "../../services";

const Explore = () => {
  const { allPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    allPostsListener(dispatch, getAllPosts);
  }, []);
  return (
    <div>
      {allPosts?.map((post) => (
        <PostCard key={post.postId} postInfo={post} />
      ))}
    </div>
  );
};

export default Explore;
