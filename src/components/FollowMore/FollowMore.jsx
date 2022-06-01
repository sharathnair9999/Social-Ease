import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { queryUserCollection, universalSnapshot } from "../../services";
import PersonCard from "../PersonCard";

const FollowMore = () => {
  const { uid } = useSelector((state) => state.auth);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const unsubscribe = universalSnapshot(
      queryUserCollection,
      setUserList,
      "uid"
    );

    return unsubscribe;
  }, []);

  return (
    <div
      className={`follow-more lg:flex flex-col hidden md:fixed justify-start items-start gap-4 md:top-20 md:w-[16rem] lg:w-[17rem] md:right-4 h-96 overflow-y-auto  `}
    >
      <p className="underline underline-offset-4 text-cta-dark decoration-accent-2  font-bold text-lg">
        Suggestions
      </p>
      {userList
        .filter((user) => user.uid !== uid)
        ?.map((user) => (
          <PersonCard key={user.uid} user={user} />
        ))}
    </div>
  );
};

export default FollowMore;
