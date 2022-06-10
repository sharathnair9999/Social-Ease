import React from "react";
import { useSelector } from "react-redux";
import PersonCard from "../../components/PersonCard";

const People = () => {
  const { uid } = useSelector((state) => state.auth);
  const { suggestions } = useSelector((state) => state.user);
  return (
    <div className="w-full flex flex-col gap-4">
      <p className="font-medium  underline underline-offset-2 text-lg">{`People You May Know`}</p>
      {suggestions
        ?.filter((user) => (uid ? user.uid !== uid : user))
        .map((user) => (
          <PersonCard user={user} key={user.uid} />
        ))}
    </div>
  );
};

export default People;
