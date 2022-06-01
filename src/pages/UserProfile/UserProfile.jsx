import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Modal, PeopleListModal } from "../../components";
import EditProfileModal from "./components/EditProfileModal";
import { AiFillEdit } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getMonthYear, capitalize } from "../../helpers";
import { universalSnapShotDoc, userDocQuery } from "../../services";

const UserProfile = () => {
  const { profileId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [people, setPeople] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const peopleModalRef = useRef();
  const { uid, isLoggedIn } = useSelector((state) => state.auth);
  const initialUserInfo = {
    displayName: "",
    photoURL: "",
    username: "",
    joinedAt: "",
    bookmarks: [],
    followers: [],
    following: [],
    likedPosts: [],
    posts: [],
    bio: "",
    link: "",
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  useEffect(() => {
    const unsubscribe = universalSnapShotDoc(
      userDocQuery(profileId),
      setUserInfo,
      "uid"
    );

    return () => {
      unsubscribe();
      setUserInfo(initialUserInfo);
    };
  }, [profileId]);

  const handleFollowersModal = () => {
    setShowPeopleModal(true);
    setPeople(userInfo.followers);
    setModalTitle("Followers");
  };
  const handleFollowingModal = () => {
    setShowPeopleModal(true);
    setPeople(userInfo.followers);
    setModalTitle("Following");
  };

  return (
    <div className="flex juustify-start items-start flex-col w-full shadow-md p-2 rounded-md">
      <Modal showModal={showModal}>
        <EditProfileModal setShowModal={setShowModal} />
      </Modal>
      <img
        className="md:w-32 md:h-32 w-24 h-24 rounded-full mx-auto mb-2"
        src={userInfo?.photoURL}
        alt={userInfo.displayName}
      />
      <p className="flex justify-between w-full items-end gap-4">
        <span className="font-extrabold text-2xl">
          {capitalize(userInfo.displayName)}
        </span>
        {isLoggedIn && profileId === uid && (
          <button
            className="bg-cta-dark text-white text-lg hover:bg-cta-dark/80 font-bold transition-all p-2 rounded-full flex justify-center items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <AiFillEdit />
          </button>
        )}
      </p>
      <section className="flex justify-start items-center gap-4">
        <span className="text-md ">{`@${userInfo.username}`}</span>
        {userInfo.link && (
          <span className="flex items-center text-md">
            <BiLink />
            <a
              href={userInfo.link}
              target="_blank"
              rel="noreferrer"
              className="text-cta-dark underline underline-offset-2"
            >
              {userInfo.link}
            </a>
          </span>
        )}
      </section>
      <p className="text-sm">{`Joined on ${getMonthYear(
        userInfo.joinedAt.seconds
      )}`}</p>
      <p className="flex justify-start items-center gap-10 my-1">
        <button
          onClick={handleFollowersModal}
          className="text-md border-b-2 border-cta-dark pb- hover:bg-cta-light cursor-pointer px-2 hover:scale-105 font-semibold rounded-sm"
        >{`${userInfo.followers.length} Followers`}</button>
        <button
          onClick={handleFollowingModal}
          className="text-md border-b-2 border-cta-dark pb- hover:bg-cta-light cursor-pointer px-2 hover:scale-105 font-semibold rounded-sm"
        >{`${userInfo.following.length} Following`}</button>
      </p>
      <section className="flex justify-between items-center w-full my-1">
        <NavLink
          className={({ isActive }) =>
            ` flex justify-center items-center flex-grow px-2 py-1${
              isActive
                ? " underline shadow-md underline-offset-2  font-bold bg-slate-50"
                : ""
            } text-cta-dark`
          }
          to={"./"}
        >
          Posts
        </NavLink>
        {isLoggedIn && profileId === uid && (
          <NavLink
            className={({ isActive }) =>
              ` flex justify-center items-center flex-grow px-2 py-1${
                isActive
                  ? " shadow-md underline underline-offset-2  font-bold bg-slate-50"
                  : ""
              } text-cta-dark`
            }
            to={"./bookmarks"}
          >
            Bookmarks
          </NavLink>
        )}
        {isLoggedIn && profileId === uid && (
          <NavLink
            className={({ isActive }) =>
              ` flex justify-center items-center flex-grow px-2 py-1${
                isActive
                  ? " shadow-md underline underline-offset-2 font-bold bg-slate-50"
                  : ""
              } text-cta-dark`
            }
            to={"./likes"}
          >
            Likes
          </NavLink>
        )}
      </section>
      <div className="w-full">
        <Outlet context={{ userInfo }} />
      </div>
      {showPeopleModal && (
        <Modal showModal={showPeopleModal}>
          <PeopleListModal
            ref={peopleModalRef}
            setShowModal={setShowPeopleModal}
            text={modalTitle}
            people={people}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
