import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../custom-hooks";
import { handleChange, uploadFile } from "../helpers";

const PostEditor = React.forwardRef(
  ({ newPost, existingPostInfo, setShowModal }, ref) => {
    useOnClickOutside(ref, () => setShowModal(false));

    const handlePost = (e) => {
      e.preventDefault();
    };
    const navigate = useNavigate();
    const [isValidDetails, setisValidDetails] = useState(true);
    const [file, setFile] = useState("");

    const newPostState = {
      postDescription: "",
      files: [],
    };
    console.log(existingPostInfo);
    const postState = newPost ? newPostState : existingPostInfo;
    const [postDetails, setPostDetails] = useState(postState);

    useEffect(() => {
      file && uploadFile(file, setisValidDetails, setPostDetails);
      return () => setPostDetails(newPostState);
    }, [file]);
    return (
      <form
        ref={ref}
        className={`w-2/4 bg-white/95 px-4 py-2 md:h-96 h-40 rounded-md shadow-xl `}
        onSubmit={handlePost}
      >
        <input
          type="text"
          placeholder="What's on your mind?"
          name="postDescription"
          className="border-none outline-none p-1 bg-transparent"
          value={postDetails.postDescription}
          onChange={(e) => handleChange(e, setPostDetails)}
        />
        <section className="utilities">
          <input type="file" name="files" id="files" />
        </section>
      </form>
    );
  }
);

export default PostEditor;
