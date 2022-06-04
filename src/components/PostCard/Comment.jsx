import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../services/userServices";
import EmojiPicker from "../EmojiPicker";
import { ImCancelCircle } from "react-icons/im";
import { AiFillEdit, AiOutlineSend, AiFillDelete } from "react-icons/ai";

export const Comment = ({ newComment, existingCommentInfo }) => {
  const { uid, photoURL, displayName } = useSelector((state) => state.auth);
  const newCommentState = {
    commentId: "",
    comment: "",
    uid,
  };
  const initialCommentState = newComment
    ? newCommentState
    : existingCommentInfo;
  const [comment, setComment] = useState(initialCommentState);
  const [showEmojis, setShowEmojis] = useState(false);
  const emojisRef = useRef();
  const [commentedUserInfo, setCommentedUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const submitComment = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    existingCommentInfo?.uid &&
      getUserInfo(existingCommentInfo.uid, setCommentedUserInfo);
  }, [existingCommentInfo]);

  return (
    <form
      className="flex justify-start items-center gap-2 px-2 w-full shadow-sm rounded-md"
      onSubmit={submitComment}
    >
      <Link
        to={
          newComment ? `/profile/${uid}` : `/profile/${commentedUserInfo.uid}`
        }
      >
        <img
          className="w-10 h-10 rounded-full mb-auto object-cover "
          src={newComment ? photoURL : commentedUserInfo.photoURL}
          alt={newComment ? displayName : commentedUserInfo.displayName}
        />
      </Link>
      {newComment || isEditing ? (
        <>
          <textarea
            type="text"
            placeholder="Write a Comment... "
            className="flex-grow  px-2 text-md min-h-[2.2rem] max-h-20 focus:outline-1 outline-cta-dark/20 "
            value={comment.comment}
            onChange={(e) =>
              setComment((state) => ({ ...state, comment: e.target.value }))
            }
          />
        </>
      ) : (
        <section className="flex-col flex justify-start  max-w-[80%]  flex-grow px-2 py-1 rounded-md bg-slate-50">
          <p className="text-xs font-semibold">
            {commentedUserInfo.displayName}
          </p>
          <p className="text-sm font-normal ">{comment.comment}</p>
        </section>
      )}

      <section className="flex justify-center items-center gap-1">
        {(newComment || isEditing) && (
          <button
            type="button"
            className="text-lg"
            onClick={() => setShowEmojis((state) => !state)}
          >
            😀
          </button>
        )}
        {(newComment || isEditing) && (
          <button
            className=" flex justify-center items-center rounded-full hover:bg-accent-1-light/60 p-2"
            type="submit"
          >
            <AiOutlineSend size={"1rem"} />
          </button>
        )}
        {commentedUserInfo.uid &&
          commentedUserInfo.uid === uid &&
          (!isEditing ? (
            <section className="flex flex-col ml-auto">
              <button
                className="text-md mb-auto ml-auto  flex justify-center items-center rounded-full hover:bg-accent-1-light/60 p-2"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                <AiFillEdit />
              </button>{" "}
              <button
                className="text-md mb-auto ml-auto  flex justify-center items-center rounded-full hover:bg-accent-1-light/60 p-2"
                type="button"
              >
                <AiFillDelete />
              </button>
            </section>
          ) : (
            <button
              className="text-lg"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              <ImCancelCircle size={"0.8rem"} />
            </button>
          ))}
      </section>
      {showEmojis && (
        <EmojiPicker
          ref={emojisRef}
          setShowEmojis={setShowEmojis}
          setDetails={setComment}
          fieldName="comment"
        />
      )}
    </form>
  );
};
