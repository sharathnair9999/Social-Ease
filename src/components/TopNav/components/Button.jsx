import React from "react";

const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={` ${className} bg-cta-dark text-white font-bold px-3 hover:brightness-90 text-xs py-2 rounded-md shadow-md hover:shadow-lg relative top-0 hover:top-[-2px] transition duration-300`}
    >
      {children}
    </button>
  );
};

export default Button;
