import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../custom-hooks";
import { handleChange, uploadFile } from "../helpers";
import { BsFillImageFill } from "react-icons/bs";

const PostEditor = React.forwardRef(
  ({ newPost, existingPostInfo, setShowModal }, ref) => {
    useOnClickOutside(ref, () => setShowModal(false));

    const newPostState = {
      postDescription: "",
      files: [],
    };
    const navigate = useNavigate();
    const [isValidDetails, setisValidDetails] = useState(true);
    const [images, setImages] = useState("");
    const postState = newPost ? newPostState : existingPostInfo;
    const [postDetails, setPostDetails] = useState(postState);
    const handlePost = (e) => {
      e.preventDefault();
    };

    const handleImages = (e) => {
      Object.values(e.target.files).forEach((file) => console.log(file.name));
    };

    useEffect(() => {
      images && uploadFile(images, setisValidDetails, setPostDetails);
      return () => setPostDetails(newPostState);
    }, [images]);
    return (
      <form
        ref={ref}
        className={`md:w-2/4 w-full mx-2 bg-white/95 px-4 py-2 h-96 rounded-md shadow-xl flex justify-start items-start flex-col gap-2`}
        onSubmit={handlePost}
      >
        <textarea
          type="text"
          placeholder="What's on your mind?"
          name="postDescription"
          className="border-none outline-none p-1 bg-transparent w-full"
          value={postDetails.postDescription}
          onChange={(e) => handleChange(e, setPostDetails)}
        />
        <img src="" alt="" />
        <section className="utilities mt-auto">
          <span className="relative ">
            <input
              type="file"
              name="file"
              id="file"
              accept="image/x-png,image/gif,image/jpeg"
              className=" absolute overflow-hidden hidden z-[-1]"
              multiple
              onChange={(e) => handleImages(e)}
            />
            <label
              htmlFor="file"
              className="bg-slate-100 flex justify-center items-center rounded-full cursor-pointer p-2 hover:bg-slate-200 transition"
            >
              <BsFillImageFill size={"1rem"} />
            </label>
          </span>
        </section>
      </form>
    );
  }
);

export default PostEditor;
