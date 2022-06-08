import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components";
import { fetchExplorePosts } from "../../services";
import { BsGraphUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { sortByLatest, sortByTrending } from "../../helpers";

const Explore = () => {
  const { explorePosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState({ latest: false, trending: true });
  const trendingPosts = sortByTrending([...explorePosts], sortBy.trending);
  const latestPosts = sortByLatest([...trendingPosts], sortBy.latest);
  useEffect(() => {
    dispatch(fetchExplorePosts());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-end items-center gap-4 sticky bg-white w-full top-[3.25rem] p-1">
        <button
          onClick={() =>
            setSortBy((state) => ({
              ...state,
              trending: false,
              latest: !state.latest,
            }))
          }
          className={`px-2 py-1 rounded-md text-xs ${
            sortBy.latest
              ? "bg-cta-dark text-cta-light"
              : "bg-cta-light text-cta-dark"
          }  hover:bg-cta-dark/20 hover:text-cta-dark font-medium  shadow-md flex justify-center items-center gap-2`}
        >
          <MdDateRange />
          <span> Latest</span>
        </button>
        <button
          onClick={() =>
            setSortBy((state) => ({
              ...state,
              latest: false,
              trending: !state.trending,
            }))
          }
          className={`px-2 py-1 rounded-md text-xs ${
            sortBy.trending
              ? "bg-cta-dark text-cta-light"
              : "bg-cta-light text-cta-dark"
          }  hover:bg-cta-dark/20 hover:text-cta-dark font-medium shadow-md flex justify-center items-center gap-2`}
        >
          <BsGraphUp />
          <span>Trending</span>
        </button>
      </div>
      {latestPosts?.map((post) => (
        <PostCard key={post.postId} postInfo={post} />
      ))}
    </div>
  );
};

export default Explore;
