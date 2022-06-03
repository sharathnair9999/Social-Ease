import React, { useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  // BsFillBookmarkFill,  will be using later
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { useOnClickOutside } from "../../custom-hooks";
import Modal from "../Modal";
import PostEditor from "../PostEditor";
import PostActions from "../PostActions";
import { AiFillLike } from "react-icons/ai";
import PeopleListModal from "../PeopleListModal";
import { Link } from "react-router-dom";
import { getReadableDate } from "../../helpers";
import { useSelector } from "react-redux";
import { deletePost } from "../../services";
import Comments from "./Comments";
const PostCard = ({ postInfo, enableComments }) => {
  const authState = useSelector((state) => state.auth);
  const {
    uid,
    media,
    postDescription,
    likes,
    createdAt,
    postId,
    displayName,
    username,
    photoURL,
  } = postInfo;
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [showComments, setShowComments] = useState(
    enableComments ? true : false
  );
  const likesModalRef = useRef();
  const editModalRef = useRef();
  const optionsRef = useRef();

  // Dummy data for now. Will change during comment feature
  const comments = [
    {
      commentId: "1",
      comment: "Comment 1",
      uid: "MHM8FdD5ROdOf285bhDHXfr6LPn2",
    },
    {
      commentId: "2",
      comment: "Comment 2",
      uid: "H0maPlsU7WVO9tMJGEYfaYKPyDf2",
    },
    {
      commentId: "3",
      comment: "Comment 3",
      uid: "yY2ABngg1rbHt16RTGFXBzwotZ82",
    },
  ];

  useOnClickOutside(optionsRef, () => setShowOptions(false));
  return (
    <div className="h-full w-full mb-4 shadow-md">
      <section className="flex justify-start items-center gap-4 px-2">
        <Link to={`/profile/${uid}`}>
          <img
            src={photoURL}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
        <section className="flex justify-start items-start gap-0 flex-col">
          <p className="text-md font-medium">{`${displayName}`}</p>
          <p className="text-sm font-normal">{`@${username}`}</p>
          <p className="text-xs font-light">
            {getReadableDate(createdAt?.seconds)}
          </p>
        </section>
        {authState.isLoggedIn && (
          <section className="ml-auto relative">
            <button
              onClick={() => setShowOptions((state) => !state)}
              className="bg-transparent flex justify-center items-center transition-all hover:bg-cta-light hover:shadow-sm rounded-full w-8 h-8"
            >
              <FiMoreHorizontal size={"1.1rem"} />
            </button>

            <section
              ref={optionsRef}
              className={`absolute top-8 right-0 ${
                !showOptions && "opacity-0 pointer-events-none"
              } transition-all flex justify-start items-start flex-col gap-1 bg-accent-2/70 p-1 rounded-md `}
            >
              {uid === authState.uid && (
                <button
                  onClick={() => {
                    setShowModal(true);
                    setShowOptions(false);
                  }}
                  className="flex justify-start items-center gap-1 text-cta-light px-2 py-1 rounded-md hover:bg-accent-2 w-full"
                >
                  <BiEditAlt />
                  <span className="whitespace-nowrap">Edit</span>
                </button>
              )}
              {uid === authState.uid && (
                <button
                  onClick={() => deletePost(postInfo.postId, authState.uid)}
                  className="flex justify-start items-center gap-1 text-cta-light px-2 py-1 rounded-md hover:bg-accent-2 w-full"
                >
                  <AiFillDelete />
                  <span className="whitespace-nowrap">Delete</span>
                </button>
              )}
              <button className="flex justify-start items-center gap-1 text-cta-light px-2 py-1 rounded-md hover:bg-accent-2 w-full">
                <BsFillBookmarkCheckFill />
                <span className="whitespace-nowrap">Add to Bookmarks</span>
              </button>
            </section>
          </section>
        )}
      </section>

      {postInfo.postDescription?.length < 60 ? (
        <Link to={`/post/${postInfo.postId}`}>
          <p className="px-2 my-1">{postInfo.postDescription}</p>
        </Link>
      ) : (
        <p className="px-2 my-1">
          {showFullText ? (
            <Link to={`/post/${postInfo.postId}`}>
              <span>{postInfo.postDescription}</span>
            </Link>
          ) : (
            <Link
              to={`/post/${postInfo.postId}`}
            >{`${postInfo.postDescription?.substring(0, 60)}... `}</Link>
          )}{" "}
          <button
            className="text-sm font-light hover:bg-slate-50 hover:shadow-md p-[2px] rounded-sm"
            onClick={() => setShowFullText((state) => !state)}
          >
            {showFullText ? "Show less" : "Show more"}
          </button>
        </p>
      )}

      {media?.length > 0 && (
        <Link to={`/post/${postInfo.postId}`}>
          <img
            src={media[0]}
            alt={postDescription}
            className="w-full py-2 h-auto"
          />
        </Link>
      )}
      {likes?.length > 0 && (
        <p
          onClick={() => setOpenLikesModal(true)}
          className="px-2 text-sm flex justify-start items-center gap-2"
        >
          <AiFillLike className="bg-cta-dark rounded-full p-[2px] w-5 h-5 text-cta-light flex justify-center items-center" />
          <span
            onClick={() => setOpenLikesModal(true)}
            className="hover:underline cursor-pointer"
          >
            {`${likes?.length} Likes`}
          </span>
        </p>
      )}
      <span className="flex justify-between items-center px-1 py-2">
        <PostActions
          postId={postId}
          likes={likes}
          setShowComments={setShowComments}
        />
        <span className="text-sm">{`${comments.length} comments`}</span>
      </span>
      {showModal && (
        <Modal showModal={showModal}>
          <PostEditor
            ref={editModalRef}
            setShowModal={setShowModal}
            existingPostInfo={postInfo}
          />
        </Modal>
      )}
      {openLikesModal && (
        <Modal showModal={openLikesModal}>
          <PeopleListModal
            ref={likesModalRef}
            setShowModal={setOpenLikesModal}
            text={"Liked By"}
            likesModal
            people={likes}
          />
        </Modal>
      )}
      {showComments && <Comments comments={comments} />}
    </div>
  );
};

export default PostCard;
