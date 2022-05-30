import React from "react";
import PersonCard from "../PersonCard";

const FollowMore = () => {
  return (
    <div
      className={` lg:flex flex-col hidden md:fixed justify-start items-start gap-4 md:top-20 md:w-[16rem] lg:w-[17rem] md:right-4 h-96 overflow-y-auto  `}
    >
      {[...Array(20)].map((_, id) => (
        <PersonCard key={id} id={id} />
      ))}
    </div>
  );
};

export default FollowMore;
