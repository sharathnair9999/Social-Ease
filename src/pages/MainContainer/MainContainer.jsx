import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  FollowMore,
  Modal,
  PostEditor,
  SideNav,
  TopNav,
} from "../../components";
import { SiAddthis } from "react-icons/si";
import { useLocation } from "react-router-dom";

const MainContainer = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();
  return (
    <div className="min-h-screen flex justify-center items-start">
      <TopNav />
      <SideNav />
      <div className=" lg:mr-[6rem] flex-grow xl:max-w-[40rem] md:max-w-[34rem] mt-16 px-2">
        {children}
      </div>
      <FollowMore />
      {isLoggedIn && pathname !== "/feed" && (
        <button
          className={` text-cta-light fixed transition-all md:bottom-10 bottom-16 right-4 md:right-10 md:text-lg text-sm font-bold md:px-4 md:py-2 px-3 py-1 mt-4 bg-cta-dark flex justify-center md:w-14 h-10 w-10 hover:shadow-2xl shadow-xl rounded-full md:h-14 items-center gap-2`}
          onClick={() => setShowModal(true)}
        >
          <SiAddthis size={"1.2rem"} />
        </button>
      )}
      <Modal showModal={showModal}>
        <PostEditor ref={ref} newPost setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default MainContainer;
