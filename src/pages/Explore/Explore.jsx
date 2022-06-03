import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components";
import { fetchExplorePosts } from "../../services";

const Explore = () => {
  const { explorePosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExplorePosts());
  }, [dispatch]);
  return (
    <div>
      {explorePosts?.map((post) => (
        <PostCard key={post.postId} postInfo={post} />
      ))}
    </div>
  );
};

export default Explore;
