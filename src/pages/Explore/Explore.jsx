import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard, PostSkeleton } from "../../components";
import { fetchExplorePosts } from "../../services";
import { BsGraphUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { sortPosts } from "../../helpers";
import { IoIosArrowUp } from "react-icons/io";

const Explore = () => {
  const { explorePosts, explorePostsLoading } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("LATEST");
  const sortedPosts = sortPosts(explorePosts, sortBy);
  useEffect(() => {
    dispatch(fetchExplorePosts());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-end items-center gap-4 sticky bg-white w-full top-14 px-1 py-2">
        <button
          onClick={() =>
            sortBy === "LATEST" ? setSortBy("OLDEST") : setSortBy("LATEST")
          }
          className={`px-2 py-1 rounded-md text-xs ${
            sortBy === "LATEST" || sortBy === "OLDEST"
              ? "bg-cta-dark text-cta-light"
              : "bg-cta-light text-cta-dark"
          }  hover:bg-cta-dark/20 hover:text-cta-dark font-medium  shadow-md flex justify-center items-center gap-2`}
        >
          <MdDateRange />
          <span> {sortBy === "LATEST" ? "Oldest" : "Latest"}</span>
          <IoIosArrowUp />
        </button>
        <button
          onClick={() => setSortBy("TRENDING")}
          className={`px-2 py-1 rounded-md text-xs ${
            sortBy === "TRENDING"
              ? "bg-cta-dark text-cta-light"
              : "bg-cta-light text-cta-dark"
          }  hover:bg-cta-dark/20 hover:text-cta-dark font-medium shadow-md flex justify-center items-center gap-2`}
        >
          <BsGraphUp />
          <span>Trending</span>
        </button>
      </div>
      {explorePostsLoading &&
        [...Array(10)].map((_, id) => (
          <PostSkeleton key={id} textOnly={id % 2 === 0} />
        ))}
      {!explorePostsLoading && explorePosts.length > 0
        ? sortedPosts.map((post) => (
            <PostCard key={post.postId} postInfo={post} />
          ))
        : "No Posts On the Wall"}
    </div>
  );
};

export default Explore;
