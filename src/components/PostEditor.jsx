import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";
import { deleteFile, handleChange, uploadFile } from "../helpers";
import { BsFillImageFill } from "react-icons/bs";
import { ref as firestoreRef } from "firebase/storage";
import { storage } from "../firebase-config";
import { AiFillDelete } from "react-icons/ai";
import { addNewPost, editPost } from "../services";
import Button from "./Button";
import { useDispatch } from "react-redux";
import EmojiPicker from "./EmojiPicker";

const PostEditor = React.forwardRef(
  ({ newPost, existingPostInfo, setShowModal }, ref) => {
    const newPostState = {
      postDescription: "",
      media: [],
      likes: [],
      comments: [],
    };
    const dispatch = useDispatch();
    const [isValidDetails, setisValidDetails] = useState(true);
    const [images, setImages] = useState([]);
    const postState = newPost
      ? newPostState
      : {
          postDescription: existingPostInfo.postDescription,
          media: existingPostInfo.media,
          likes: existingPostInfo.likes,
          comments: existingPostInfo.comments,
          uid: existingPostInfo.uid,
          createdAt: existingPostInfo.createdAt,
        };
    const [postDetails, setPostDetails] = useState(postState);
    const [showEmojis, setShowEmojis] = useState(false);
    const emojisRef = useRef();
    useOnClickOutside(emojisRef, () => setShowEmojis(false));
    const cancelPostAction = async () => {
      if (
        postDetails.postDescription.length > 0 ||
        postDetails.media.length > 0
      ) {
        let confirm = window.confirm(
          "Are You Sure you want to discard this post?"
        );
        if (confirm) {
          if (newPost && postDetails.media.length > 0) {
            await deleteFile(
              firestoreRef(storage, postDetails.media[0]),
              setPostDetails,
              "media",
              ""
            );
          }
          setPostDetails(postState);
          setImages([]);
        }
        setShowModal(false);
      } else {
        setShowModal(false);
      }
    };
    const handlePost = async (e) => {
      e.preventDefault();
      newPost
        ? dispatch(addNewPost(postDetails))
        : dispatch(editPost({ postDetails, postId: existingPostInfo.postId }));
      setPostDetails(newPostState);
      setImages([]);
      setShowModal(false);
    };

    useEffect(() => {
      (async () => {
        for await (const image of images) {
          uploadFile(image, setisValidDetails, setPostDetails, false, "media");
        }
      })();
    }, [images]);

    return (
      <form
        className={`relative md:w-2/4 w-full mx-2 bg-white/95 px-4 py-2 h-96 rounded-md shadow-xl flex justify-start items-start flex-col gap-2 z-20`}
        onSubmit={handlePost}
      >
        <textarea
          type="text"
          placeholder="What's on your mind?"
          name="postDescription"
          className="border-none outline-none p-1 bg-transparent w-full"
          value={postDetails.postDescription}
          onChange={(e) => handleChange(e, setPostDetails)}
          required
        />
        {postDetails.media.length > 0 && (
          <div className="relative">
            <img
              src={postDetails.media[0]}
              alt="upload"
              className="max-w-xs max-h-60"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500"
              onClick={() => {
                deleteFile(
                  firestoreRef(storage, postDetails.media[0]),
                  setPostDetails,
                  "media"
                );
                setImages([]);
              }}
            >
              <AiFillDelete size={"1.2rem"} />
            </button>
          </div>
        )}
        <section className="utilities mt-auto flex justify-start items-center gap-4 relative w-full ">
          <span className="relative ">
            <input
              type="file"
              name="file"
              id="file"
              accept="image/x-png,image/gif,image/jpeg"
              className=" absolute overflow-hidden hidden z-[-1]"
              onChange={(e) => setImages([e.target.files[0]])}
            />
            <label
              htmlFor="file"
              className="bg-slate-100 flex justify-center items-center rounded-full object-cover cursor-pointer p-2 hover:bg-slate-200 transition"
            >
              <BsFillImageFill size={"1rem"} />
            </label>
          </span>
          <button
            type="button"
            onClick={() => setShowEmojis((state) => !state)}
          >
            😀
          </button>
          <section className="absolute md:bottom-0 -bottom-10 md:right-32 right-16 z-10">
            {showEmojis && (
              <EmojiPicker
                ref={emojisRef}
                setShowEmojis={setShowEmojis}
                setDetails={setPostDetails}
                fieldName="postDescription"
              />
            )}
          </section>
          <section className="ml-auto flex justify-center items-center gap-2">
            <Button
              type="submit"
              className={`${
                isValidDetails && postDetails.postDescription.length !== 0
                  ? "bg-cta-dark text-white"
                  : "bg-cta-light text-slate-400 cursor-not-allowed ml-auto "
              }`}
              disabled={
                !isValidDetails || postDetails.postDescription.length === 0
              }
            >
              {newPost ? "Add Post" : "Update Post"}
            </Button>
            <Button
              onClick={() => {
                cancelPostAction();
              }}
              type="button"
              className={`bg-red-600 text-white hover:bg-red-700 ml-auto`}
            >
              Cancel
            </Button>
          </section>
        </section>
      </form>
    );
  }
);

export default PostEditor;
