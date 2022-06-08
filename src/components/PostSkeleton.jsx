import React from "react";

const PostSkeleton = ({ textOnly }) => {
  return (
    <div className="w-full flex flex-col gap-2 shadow-md rounded-md p-2 my-2">
      <div className="flex justify-start items-center gap-4">
        <div className="rounded-full w-10 h-10 loading"></div>
        <div className="flex flex-col gap-3 items-start justify-start">
          <div className="h-2 rounded-md w-40 loading"></div>
          <div className="h-2 rounded-md w-32 loading"></div>
        </div>
      </div>
      <div className="h-2 rounded-md w-full loading"></div>
      {textOnly && <div className="h-2 rounded-md w-full loading"></div>}
      {textOnly && <div className="h-2 rounded-md w-full loading"></div>}
      {!textOnly && <div className="h-60 loading "></div>}
      <div></div>
    </div>
  );
};

export default PostSkeleton;
