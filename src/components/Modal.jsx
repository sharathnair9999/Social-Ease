import React, { useEffect } from "react";

const Modal = ({ children, showModal }) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <div
      className={`animate-fadeModal fixed top-0 right-0 left-0 bottom-0 bg-opacity-80 bg-black z-10 flex justify-center items-center ${
        showModal ? "block" : "hidden"
      } transition duration-200`}
    >
      {children}
    </div>
  );
};

export default Modal;
