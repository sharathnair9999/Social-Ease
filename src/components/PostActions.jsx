import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { handleLike } from "../services";

const PostActions = ({ postId, setShowComments, likes }) => {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isLiked = likes?.some((user) => user === uid);

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        onClick={() => dispatch(handleLike(postId))}
        className={`inline-flex gap-2 items-center md:py-2 md:px-4 px-2 py-1 text-xs md:text-sm font-medium  ${
          isLiked ? "text-cta-dark" : "text-gray-900"
        } bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-cta-dark    dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
      >
        {isLiked ? <AiFillLike /> : <AiOutlineLike />}
        <span>{isLiked ? "Remove Like" : "Like"}</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setShowComments((state) => !state);
        }}
        className="inline-flex gap-2 items-center md:py-2 md:px-4 px-2 py-1 text-xs md:text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-cta-dark    dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        <FaRegComment />
        <span>Comment</span>
      </button>
      <button
        type="button"
        className="inline-flex gap-2 items-center md:py-2 md:px-4 px-2 py-1 text-xs md:text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-cta-dark    dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        <RiShareForwardLine />
        <span>Share</span>
      </button>
    </div>
  );
};

export default PostActions;
