import React from "react";
import { FollowMore, SideNav, TopNav } from "../../components";

const MainContainer = ({ children }) => {
  return (
    <div className="min-h-screen">
      <TopNav />
      <SideNav />
      <div className=" md:max-w-5xl mt-16 px-4 md:min-w-[15rem] md:ml-[14rem] lg:mr-[14rem] ">
        {children}
      </div>
      <FollowMore />
    </div>
  );
};

export default MainContainer;
