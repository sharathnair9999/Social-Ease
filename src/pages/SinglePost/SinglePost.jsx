import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard } from "../../components";
import { fetchSinglePost } from "../../services";

const SinglePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { singlePost, singlePostLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

  return (
    <div className="mx-1">
      {singlePostLoading ? (
        "Loading " //will updat with an svg soon
      ) : (
        <div>
          <PostCard postInfo={singlePost} enableComments />
        </div>
      )}
    </div>
  );
};

export default SinglePost;
