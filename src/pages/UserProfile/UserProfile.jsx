import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Modal, PeopleListModal } from "../../components";
import EditProfileModal from "./components/EditProfileModal";
import { AiFillEdit } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getMonthYear, capitalize, constants } from "../../helpers";
import { fetchUserInfo } from "../../services";

const UserProfile = () => {
  const { uid, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { profileId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [people, setPeople] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const peopleModalRef = useRef();

  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo(profileId));
  }, [dispatch, profileId]);

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
        <EditProfileModal userInfo={userInfo} setShowModal={setShowModal} />
      </Modal>
      <img
        className={`md:w-32 ${
          !userInfo?.photoURL ? "rounded-lg" : "rounded-full"
        } md:h-32 w-24 h-24  mx-auto mb-2`}
        src={
          userInfo?.photoURL ? userInfo.photoURL : constants.imgUrls.invalidUser
        }
        alt={userInfo.displayName}
      />
      <p className="flex justify-between w-full items-end gap-4">
        <span
          className={`font-extrabold text-2xl ${
            !userInfo.displayName && "mx-auto"
          } `}
        >
          {userInfo.displayName
            ? capitalize(userInfo.displayName)
            : `User Does Not Exist`}
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
      {userInfo.displayName && (
        <div className="w-full">
          <section className="flex justify-start items-center gap-4">
            <span className="text-md ">{`@${userInfo.username}`}</span>
            {userInfo.link && (
              <span className="flex items-center text-md">
                <BiLink />
                <a
                  href={
                    userInfo.link && !userInfo.link.includes("http")
                      ? `https://${userInfo.link}`
                      : userInfo.link
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-cta-dark underline underline-offset-2"
                >
                  {userInfo.link}
                </a>
              </span>
            )}
          </section>
          {userInfo.bio && <p>{userInfo.bio}</p>}
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
              {`Posts (${userInfo.posts?.length})`}
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
                {`Bookmarks (${userInfo.bookmarks.length})`}
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
                {`Likes (${userInfo.likedPosts.length})`}
              </NavLink>
            )}
          </section>
          <div className="w-full">
            <Outlet context={{ userInfo }} />
          </div>
        </div>
      )}
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
