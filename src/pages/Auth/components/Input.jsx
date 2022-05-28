import React, { useState } from "react";
import { BiShow, BiHide, BiError } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";

const Input = ({ isValidUsername, ...args }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex justify-start items-start flex-col min-w-[18rem] ">
      <input
        type={
          args.type === "password"
            ? showPassword
              ? "text"
              : "password"
            : args.type
        }
        name={args.name}
        autoFocus={args.autoFocus}
        placeholder={args.placeholder}
        value={args.value}
        onChange={args.onChange}
        className={` py-1 rounded-sm ${args.className} outline-none border max-w-[20rem] px-2 w-full`}
      />
      {args.type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-2 bottom-auto right-1"
        >
          {showPassword ? <BiHide /> : <BiShow />}
        </button>
      )}
      {args.name === "username" && args.value?.length > 0 && (
        <span
          className={`${isValidUsername ? "text-green-500" : "text-red-500"}`}
        >
          {isValidUsername ? (
            <span className="text-green-500 flex justify-start items-center gap-2">
              <BsCheck2Circle /> Username Available{" "}
            </span>
          ) : (
            <span className="text-red-500 flex justify-start items-center gap-2">
              <BiError /> Already Taken
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default Input;
