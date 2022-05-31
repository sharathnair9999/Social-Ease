import React from "react";

const CommentsAndShares = ({ comments }) => {
  return (
    <p className="flex justify-start items-center gap-2 md:gap-4 md:text-sm text-xs">
      <span className="whitespace-nowrap">{`${comments.length} Comments`}</span>
      <span className="whitespace-nowrap">5 Shares</span>
    </p>
  );
};

export default CommentsAndShares;
