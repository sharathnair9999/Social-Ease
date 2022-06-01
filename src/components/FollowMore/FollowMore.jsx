import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase-config";
import PersonCard from "../PersonCard";

const FollowMore = () => {
  const { uid } = useSelector((state) => state.auth);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({
          uid: doc.id,
          followers: doc.data().followers,
          following: doc.data().following,
          username: doc.data().username,
          photoURL: doc.data().photoURL,
          displayName: doc.data().displayName,
        });
        setUserList(users);
      });
    });

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
