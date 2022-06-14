import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { followHandler } from "../services";
import Button from "./Button";

const PersonCard = ({ user, small }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { displayName, photoURL, uid, username } = user;
  const auth = useSelector((state) => state.auth);
  const {
    loggedUser: { following },
  } = useSelector((state) => state.user);
  const isFollowing = following.some((person) => person === uid);
  return (
    <div className="flex justify-start items-center gap-2 w-full shadow-md p-1">
      <Link to={`/profile/${uid}`}>
        <img
          src={photoURL}
          alt={displayName}
          className="w-10 h-10 min-w-[2.5rem] rounded-full object-cover"
        />
      </Link>
      <section className="flex justify-start items-start gap-0 flex-col">
        <Link to={`/profile/${uid}`}>
          {" "}
          <p className="text-md font-medium">{displayName}</p>
        </Link>
        <p className="text-sm font-normal">{`@${
          small
            ? username.length > 15
              ? `${username.slice(0, 18)}...`
              : username
            : username
        }`}</p>
      </section>
      {auth.uid !== uid && (
        <Button
          onClick={() =>
            auth.isLoggedIn
              ? dispatch(followHandler({ personId: uid, user }))
              : navigate("/login")
          }
          className={`ml-auto 
        text-sm ${isFollowing ? "bg-cta-dark text-white" : " text-cta-dark"} `}
        >
          {`${isFollowing ? "Unfollow" : "Follow"}`}
        </Button>
      )}
    </div>
  );
};

export default PersonCard;
