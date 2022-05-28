import React from "react";

const Button = ({ children, ...args }) => {
  return (
    <button
      onClick={() => args.onClick?.()}
      type={args.type}
      className={`${args.className} font-bold text-sm  px-4 py-2 rounded-md relative top-0 hover:top-[-4px] hover:brightness-90 transition-all duration-200 shadow-xl`}
    >
      {children}
    </button>
  );
};

export default Button;
