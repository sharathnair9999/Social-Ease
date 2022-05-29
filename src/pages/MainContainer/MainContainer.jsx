import React from "react";
import { FollowMore, SideNav, TopNav } from "../../components";

const MainContainer = ({ children }) => {
  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="mt-14 flex justify-center items-start gap-4 pt-3">
        <SideNav />
        <div className="flex-grow">{children}</div>
        <FollowMore />
      </div>
    </div>
  );
};

export default MainContainer;
