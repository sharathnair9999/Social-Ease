import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard, PostSkeleton } from "../../components";
import { fetchSinglePost } from "../../services";

const SinglePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { singlePost, singlePostLoading, singlePostError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

  return (
    <div className="mx-1">
      {singlePostLoading ? (
        <PostSkeleton />
      ) : singlePostError ? (
        <p className="text-4xl">This Post Does Not Exist</p>
      ) : (
        <div>
          <PostCard postInfo={singlePost} singlePost enableComments />
        </div>
      )}
    </div>
  );
};

export default SinglePost;
