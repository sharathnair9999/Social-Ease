import React from "react";
import { PostSkeleton } from "../../../components";

const ProfileSkeleton = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="loading h-40 w-full"></div>
      <div className="rounded-full w-24 h-24 loading z-10 border-2 border-white -mt-14"></div>
      <div className="h-4 rounded-sm loading w-1/4 mr-auto"></div>
      <div className="h-3 rounded-sm loading w-1/3 mt-4 mr-auto"></div>
      <div className="h-3 rounded-sm loading w-1/3 mt-4 mr-auto"></div>
      <div className="flex justify-start items-start mr-auto my-4 gap-4">
        <span className="loading w-20 rounded-sm h-2"></span>
        <span className="loading w-20 rounded-sm h-2"></span>
      </div>
      {[...Array(4)].map((_, id) => (
        <PostSkeleton key={id} textOnly={id % 2 === 0} />
      ))}
    </div>
  );
};

export default ProfileSkeleton;
