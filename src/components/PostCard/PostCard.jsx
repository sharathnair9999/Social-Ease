import React, { useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useOnClickOutside } from "../../custom-hooks";
import Modal from "../Modal";
import PostEditor from "../PostEdior";
import PostActions from "../PostActions";
import CommentsAndShares from "../CommentsAndShares";
import { AiFillLike } from "react-icons/ai";
import PeopleListModal from "../PeopleListModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const PostCard = ({ postInfo }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const likesModalRef = useRef();
  const editModalRef = useRef();
  const optionsRef = useRef();
  useOnClickOutside(optionsRef, () => setShowOptions(false));
  const { uid } = useSelector((state) => state.auth);
  return (
    <div className="h-full w-full mb-4 shadow-md">
      <section className="flex justify-start items-center gap-4 px-2">
        <Link to={`/profile/${uid}`}>
          <img
            src={`https://lh3.googleusercontent.com/a-/AOh14GgbjT5Falp276vt_d-EEBSWKgflhT__G-qKQQFc5vU=s96-c`}
            alt="sharath"
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <section className="flex justify-start items-start gap-0 flex-col">
          <p className="text-md font-medium">{"Sharath Nair"}</p>
          <p className="text-sm font-normal">{"@sharathnair9999"}</p>
          <p className="text-xs font-extralight">12/04/2022</p>
        </section>
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
            <button className="flex justify-start items-center gap-1 text-cta-light px-2 py-1 rounded-md hover:bg-accent-2 w-full">
              <AiFillDelete />
              <span className="whitespace-nowrap">Delete</span>
            </button>
          </section>
        </section>
      </section>
      <p className="px-2 my-2">{postInfo.postDescription}</p>
      <img
        src="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        alt="bird chirping"
        className="w-full py-2 h-auto"
      />
      <p
        onClick={() => setOpenLikesModal(true)}
        className="px-2 text-sm flex justify-start items-center gap-2"
      >
        <AiFillLike className="bg-cta-dark rounded-full p-[2px] w-5 h-5 text-cta-light flex justify-center items-center" />
        <span
          onClick={() => setOpenLikesModal(true)}
          className="hover:underline cursor-pointer"
        >
          Liked by you and 33 others
        </span>
      </p>
      <section className="flex justify-between items-center px-1 py-2">
        <PostActions />
        <CommentsAndShares />
      </section>
      {showModal && (
        <Modal showModal={showModal}>
          <PostEditor
            ref={editModalRef}
            setShowModal={setShowModal}
            existingPostInfo={{
              postDescription: postInfo.postDescription,
              postId: postInfo.postId,
            }}
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
            people={[]}
          />
        </Modal>
      )}
    </div>
  );
};

export default PostCard;
