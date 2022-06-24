import React from "react";

const PersonSkeleton = () => {
  return (
    <div className="flex justify-center items-center gap-2 px-4 py-2 mb-2 shadow-md w-full">
      <div className="loading rounded-full w-10 h-10"></div>
      <div className="flex flex-grow justify-center items-start gap-2 flex-col">
        <div className=" h-2 w-3/4 loading rounded-md"></div>
        <div className=" h-2 w-3/4 loading rounded-md"></div>
      </div>
    </div>
  );
};

export default PersonSkeleton;
