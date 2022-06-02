import React, { useCallback, useEffect, useState } from "react";
import {
  constants,
  debounce,
  deleteFile,
  handleChange,
  uploadFile,
} from "../../helpers";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { signupUser, userNameExists } from "./helpers";
import { Brand } from "../../components";
import { FiUpload } from "react-icons/fi";
import { Button } from "../../components";
import { ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { AiFillDelete } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate();
  const [isValidDetails, setisValidDetails] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [file, setFile] = useState("");
  const initialDP = constants.imgUrls.userPlaceholder;
  const initialCredentialState = {
    email: "",
    password: "",
    gender: "",
    photoURL: initialDP,
    displayName: "",
    username: "",
  };
  const [credentials, setCredentials] = useState(initialCredentialState);

  useEffect(() => {
    if (file) {
      uploadFile(file, setisValidDetails, setCredentials, true, "photoURL");
      setFile("");
    }
  }, [file]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceUsername = useCallback(
    debounce(
      (currValue) => userNameExists(currValue, setIsValidUsername),
      1000
    ),
    []
  );

  const deletePhoto = async () => {
    await deleteFile(
      ref(storage, credentials.photoURL),
      setCredentials,
      "photoURL"
    );
    setFile("");
  };

  return (
    <div className="h-[calc(100vh-8.3rem)] flex flex-col justify-start items-start md:flex-row ">
      <div className="w-full  p-4 bg-light-1 h-full  flex flex-col justify-start  items-start ">
        <Brand full />
        <form
          onSubmit={(e) => signupUser(e, navigate, { ...credentials })}
          className="flex justify-start items-center gap-2 flex-col w-full mt-4"
        >
          <section className="relative ">
            <img
              src={credentials.photoURL}
              alt="userlogo"
              className=" w-[5rem] h-[5rem] p-1 rounded-full "
            />
            {credentials.photoURL !== initialDP && (
              <button
                type="button"
                className="absolute top-0 right-[-5px] text-red-500 text-md"
                onClick={() => {
                  deletePhoto();
                }}
              >
                <AiFillDelete size={"1.2rem"} />
              </button>
            )}
            <span className=" absolute bottom-[-5px] right-[-5px] ">
              <input
                type="file"
                name="file"
                id="file"
                className=" absolute overflow-hidden hidden z-[-1]"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="file"
                className="bg-slate-100 p-1 flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-200 transition"
              >
                <FiUpload size={"1rem"} />
              </label>
            </span>
          </section>
          <Input
            type="email"
            name="email"
            autoFocus
            placeholder="Your Email"
            value={credentials.email}
            required
            onChange={(e) => handleChange(e, setCredentials)}
          />
          <Input
            required
            placeholder="New Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={(e) => handleChange(e, setCredentials)}
          />
          <Input
            className={"border-none outline-none focus:border-red-500"}
            type="text"
            name="displayName"
            onChange={(e) => handleChange(e, setCredentials)}
            placeholder="Full Name"
          />
          <Input
            isValidUsername={isValidUsername}
            type="text"
            name="username"
            pattern="^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
            title="Invalid username format"
            value={credentials.username}
            className={`${
              credentials.username.length > 0
                ? isValidUsername
                  ? " border-green-500"
                  : " border-red-500"
                : "border-none"
            } border-[2px] rounded-sm `}
            onChange={(e) => {
              setCredentials((state) => ({
                ...state,
                username: e.target.value,
              }));
              debounceUsername(e.target.value);
            }}
            placeholder="User Name"
          />
          <label
            htmlFor="gender"
            className="mx-auto min-w-[18rem] flex items-center justify-start gap-4"
          >
            Gender
            <select
              name="gender"
              id="gender"
              value={credentials.gender}
              onChange={(e) =>
                setCredentials((state) => ({
                  ...state,
                  gender: e.target.value,
                }))
              }
            >
              <option value="select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>
          <section className="mt-2 flex justify-center items-center gap-4">
            <Button
              className={
                "bg-cta-dark text-light-1 disabled:bg-slate-50 disabled:hover:brightness-100 disabled:hover:cursor-not-allowed disabled:text-gray-900"
              }
              type={`${
                isValidDetails && isValidUsername ? "submit" : "button"
              }`}
              disabled={!isValidDetails && !isValidUsername}
            >
              Sign Up
            </Button>
            <Button
              className="bg-cta-light border-2 text-cta-dark"
              type="reset"
              onClick={() => setCredentials(initialCredentialState)}
            >
              Reset
            </Button>
          </section>
        </form>
      </div>
      <div className="font-montserrat w-full  bg-accent-2 h-full p-4 flex flex-col justify-center gap-4 items-center text-light-1">
        <h1 className="text-xl font-bold italic ">Existing User?</h1>
        <p className="font-extrabold text-3xl  gap-x-4">
          Look at what your friends are upto!!!
        </p>
        <Button
          onClick={() => navigate("/login")}
          className="text-accent-2 bg-cta-light/90 "
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Signup;
