import React from "react";
import { FollowMore, SideNav, TopNav } from "../../components";

const MainContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center items-start">
      <TopNav />
      <SideNav />
      <div className=" lg:mr-[6rem] flex-grow xl:max-w-[40rem] md:max-w-[34rem] mt-16 px-2">
        {children}
      </div>
      <FollowMore />
    </div>
  );
};

export default MainContainer;
