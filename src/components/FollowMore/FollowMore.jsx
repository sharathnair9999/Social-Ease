import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PersonCard from "../PersonCard";

const FollowMore = () => {
  const { uid } = useSelector((state) => state.auth);

  const { suggestions } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  return (
    <div
      className={`lg:flex flex-col hidden md:fixed ${
        pathname === "/people" ? "md:hidden lg:hidden" : ""
      } justify-start items-start gap-4 md:top-20 md:w-[16rem] lg:w-[17rem] md:right-4   `}
    >
      <div className="flex w-full justify-between items-center px-1">
        <p className="underline underline-offset-4 text-cta-dark decoration-accent-2  font-bold text-lg">
          Suggestions
        </p>
        <Link
          className="bg-cta-light decoration-cta-dark text-cta-dark px-2 rounded-sm hover:underline hover:underline-offset-2 hover:shadow-lg"
          to={`/people`}
        >
          See All
        </Link>
      </div>
      <div className="follow-more w-full flex justify-start items-start gap-4 flex-col h-96 overflow-y-auto">
        {suggestions
          .slice(0, 4)
          .filter((user) => user.uid !== uid)
          ?.map((user) => (
            <PersonCard key={user.uid} user={user} />
          ))}
      </div>
    </div>
  );
};

export default FollowMore;
