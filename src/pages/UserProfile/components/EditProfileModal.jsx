import { ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Input } from "../../../components";
import { storage } from "../../../firebase-config";
import {
  constants,
  debounce,
  deleteFile,
  handleChange,
  uploadFile,
} from "../../../helpers";
import { AiFillDelete } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { updateUserInfo, userNameExists } from "../../../services";
import { useDispatch } from "react-redux";

const EditProfileModal = ({ setShowModal, userInfo }) => {
  const dispatch = useDispatch();
  const defaultDP = constants.imgUrls.userPlaceholder;
  const [userDetails, setUserDetails] = useState(userInfo);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const cancelUpdate = () => {
    setShowModal(false);
  };
  const [file, setFile] = useState("");
  const [coverFile, setCoverFile] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceUsername = useCallback(
    debounce(
      (currValue) =>
        userNameExists(
          currValue,
          setIsValidUsername,
          true,
          userDetails.username
        ),
      1000
    ),
    []
  );
  const deletePhoto = async (fieldName, replacer) => {
    await deleteFile(
      ref(storage, userDetails[fieldName]),
      setUserDetails,
      fieldName,
      replacer
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(userDetails));
    setShowModal(false);
  };

  useEffect(() => {
    if (file) {
      console.log("uploading dp");
      uploadFile(file, setIsValid, setUserDetails, true, "photoURL");
      setFile("");
    }
  }, [file]);
  useEffect(() => {
    if (coverFile) {
      console.log("uploading cover");
      uploadFile(coverFile, setIsValid, setUserDetails, true, "coverPhoto");
      setCoverFile("");
    }
  }, [coverFile]);

  useEffect(() => {
    setUserDetails(userInfo);
  }, [userInfo]);

  console.log(userDetails);

  return (
    <form
      className="relative md:w-2/4 w-full mx-2 bg-white/95 px-4 py-2 h-[30rem] md:h-3/4 rounded-md shadow-xl flex justify-center items-center flex-col gap-2 z-20"
      onSubmit={handleSubmit}
    >
      <img
        className="absolute w-full rounded-t-md top-0 opacity-80 h-28 object-cover -left-0 -z-10"
        src={
          userDetails.coverPhoto
            ? userDetails.coverPhoto
            : constants.imgUrls.userCoverPlaceholder
        }
        alt={"cover"}
      />
      {userDetails.coverPhoto?.length > 0 && (
        <button
          type="button"
          className="absolute top-20 right-14 text-red-500 bg-slate-100 fle justify-center items-center rounded-full p-1 text-lg"
          onClick={() => {
            deletePhoto("coverPhoto", constants.imgUrls.userCoverPlaceholder);
            setCoverFile("");
          }}
        >
          <AiFillDelete size={"1.2rem"} />
        </button>
      )}
      <span className=" absolute  top-20 right-2 ">
        <input
          type="file"
          name="coverFile"
          id="coverFile"
          accept="image/x-png,image/gif,image/jpeg"
          className=" absolute overflow-hidden hidden z-[-1]"
          onChange={(e) => setCoverFile(e.target.files[0])}
        />
        <label
          htmlFor="coverFile"
          className="bg-slate-100 p-1 flex justify-center items-center rounded-full object-cover cursor-pointer hover:bg-slate-200 transition"
        >
          <FiUpload size={"1rem"} />
        </label>
      </span>

      <section className="relative mt-10">
        <img
          src={userDetails.photoURL}
          alt={userDetails.displayName}
          className={`w-20 h-20 rounded-full`}
        />
        {userDetails.photoURL !== defaultDP && (
          <button
            type="button"
            className="absolute top-0 right-[-5px] text-red-500 text-md"
            onClick={() => {
              deletePhoto("photoURL", constants.imgUrls.userPlaceholder);
              setFile("");
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
            accept="image/x-png,image/gif,image/jpeg"
            className=" absolute overflow-hidden hidden z-[-1]"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="bg-slate-100 p-1 flex justify-center items-center rounded-full object-cover cursor-pointer hover:bg-slate-200 transition"
          >
            <FiUpload size={"1rem"} />
          </label>
        </span>
      </section>
      <Input
        label={"Full Name"}
        type={"text"}
        value={userDetails.displayName}
        onChange={(e) => handleChange(e, setUserDetails)}
        autoFocus
        placeholder="Eg: Chandler Bing"
        name={"displayName"}
        required={true}
      />
      <Input
        isValidUsername={isValidUsername}
        label="Username"
        type="text"
        name="username"
        value={userDetails.username}
        className={`${
          userDetails.username?.length > 0
            ? isValidUsername
              ? " border-green-500"
              : " border-red-500"
            : "border-none"
        } border-[2px] rounded-sm `}
        onChange={(e) => {
          setUserDetails((state) => ({
            ...state,
            username: e.target.value,
          }));
          debounceUsername(e.target.value);
        }}
        placeholder="User Name"
      />
      <Input
        label={"Portfolio/Github"}
        type={"url"}
        name="link"
        value={userDetails.link}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder={`https://${userInfo.displayName.split(" ").join("")}.com/`}
      />
      <Input
        label={"Short Bio"}
        name="bio"
        placeholder="I am web developer by profession"
        value={userDetails.bio}
        onChange={(e) => handleChange(e, setUserDetails)}
      />
      <section className="flex justify-start items-center gap-2 mt-auto ml-auto mb-2">
        <Button
          type="submit"
          className="text-cta-dark bg-slate-50 disabled:cursor-not-allowed"
          disabled={!isValid}
        >
          Update
        </Button>
        <Button
          type="button"
          className="bg-red-700 text-white hover:bg-red-600"
          onClick={cancelUpdate}
        >
          Cancel
        </Button>
      </section>
    </form>
  );
};

export default EditProfileModal;
