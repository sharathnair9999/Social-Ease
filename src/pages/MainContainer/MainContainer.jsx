import React from "react";
import { FollowMore, SideNav, TopNav } from "../../components";

const MainContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center items-start">
      <TopNav />
      <SideNav />
      <div className=" lg:max-w-3xl md:max-w-4xl mt-16 px-2 md:min-w-[15rem] ">
        {children}
      </div>
      <FollowMore />
    </div>
  );
};

export default MainContainer;
