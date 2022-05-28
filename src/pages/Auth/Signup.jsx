import React, { useCallback, useEffect, useState } from "react";
import { constants, debounce, handleChange } from "../../helpers";
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import "./Auth.css";
import { signupUser, userNameExists } from "./helpers";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase-config";
import { Brand } from "../../components";
import { FiUpload } from "react-icons/fi";

const Signup = () => {
  const navigate = useNavigate();
  const [isValidDetails, setisValidDetails] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState(constants.imgUrls.userPlaceholder);
  const initialCredentialState = {
    email: "",
    password: "",
    gender: "",
    photoURL: "",
    displayName: "",
    username: "",
  };
  const [credentials, setCredentials] = useState(initialCredentialState);

  useEffect(() => {
    const uploadFile = () => {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress != null && progress < 100
            ? setisValidDetails(false)
            : setisValidDetails(true);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceUsername = useCallback(
    debounce(
      (currValue) => userNameExists(currValue, setIsValidUsername),
      1000
    ),
    []
  );

  return (
    <div className="p-4 bg-light-1 h-screen">
      <Brand full />
      <form
        onSubmit={(e) => signupUser(e, navigate, { ...credentials })}
        className="flex justify-start items-center gap-2 flex-col"
      >
        <section className="relative">
          <img
            src={imgUrl}
            alt="userlogo"
            className="w-full max-w-[5rem] rounded-full h-auto"
          />
          <span className="image-upload absolute bottom-[-5px] right-[-5px] ">
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile absolute overflow-hidden opacity-0 z-[-1]"
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
          placeholder="Your Email"
          value={credentials.email}
          required
          onChange={(e) => handleChange(e, setCredentials)}
        />
        <Input
          required
          placeholder="******"
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
          value={credentials.username}
          className={`${
            credentials.username.length > 0
              ? isValidUsername
                ? " border-green-500"
                : " border-red-500"
              : "border-none"
          } border-[2px] rounded-sm `}
          onChange={(e) => {
            setCredentials((state) => ({ ...state, username: e.target.value }));
            debounceUsername(e.target.value);
          }}
          placeholder="User Name"
        />
        <Input
          type="text"
          name="photoURL"
          onChange={(e) => handleChange(e, setCredentials)}
          placeholder="PhotoURL"
        />
        <select
          name="gender"
          value={credentials.gender}
          onChange={(e) => handleChange(e, setCredentials)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button
          className="bg-cta-dark text-light-1 px-2 py-1 text-sm rounded hover:brightness-95 transition-all  disabled:bg-slate-50 disabled:hover:brightness-100 disabled:hover:cursor-not-allowed disabled:text-gray-900"
          type={`${isValidDetails && isValidUsername ? "submit" : "button"}`}
          disabled={!isValidDetails && !isValidUsername}
        >
          Sign Up
        </button>
        <button
          className="bg-cta-light text-cta-dark px-2 py-1 text-sm rounded hover:brightness-90 transition-all "
          type="reset"
          onClick={() => setCredentials(initialCredentialState)}
        >
          Reset
        </button>
        <Link to={"/login"}>Login</Link>
      </form>
    </div>
  );
};

export default Signup;
