import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const PersonCard = ({ user }) => {
  const { displayName, photoURL, uid, username } = user;
  return (
    <div className="flex justify-start items-center gap-2 w-full shadow-md p-1">
      <Link to={`/profile/${uid}`}>
        <img
          src={photoURL}
          alt={displayName}
          className="w-10 h-10 rounded-full"
        />
      </Link>
      <section className="flex justify-start items-start gap-0 flex-col">
        <p className="text-md font-medium">{displayName}</p>
        <p className="text-sm font-normal">{`@${username}`}</p>
      </section>
      <Button
        className={`ml-auto 
        text-sm`}
        // ${id % 2 === 0 ? "bg-cta-dark text-white" : " text-cta-dark"} will add this class back after controlling followers and following
      >
        {"Follow"}
      </Button>
    </div>
  );
};

export default PersonCard;
