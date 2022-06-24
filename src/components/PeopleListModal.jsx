import React, { useEffect, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";
import { getUserDetails } from "../services";
import PersonCard from "./PersonCard";
import PersonSkeleton from "./PersonSkeleton";

const PeopleListModal = React.forwardRef(
  ({ text, people, setShowModal }, ref) => {
    useOnClickOutside(ref, () => setShowModal(false));

    const [peopleInfo, setPeopleInfo] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    useEffect(() => {
      (async () => {
        const ans = [];
        setLoadingUsers(true);
        for await (const person of people) {
          const userInfo = await getUserDetails(person);
          ans.push(userInfo);
        }
        setLoadingUsers(false);
        setPeopleInfo(ans);
      })();
    }, [people]);

    return (
      <div
        ref={ref}
        className="md:w-2/4 w-full bg-white/90 px-4 py-2 mx-2 h-96 rounded-md shadow-xl "
      >
        <p className="underline underline-offset-4 text-cta-dark decoration-accent-2 mb-2">
          {text}
        </p>
        <section className=" max-h-[21rem] h-full overflow-y-auto flex justify-start items-start gap-4 flex-col">
          {loadingUsers
            ? [...Array(4)].map((_, id) => <PersonSkeleton key={id} />)
            : peopleInfo?.map((person) => (
                <PersonCard
                  setShowModal={setShowModal}
                  key={person.uid}
                  user={person}
                />
              ))}
        </section>
      </div>
    );
  }
);
export default PeopleListModal;
