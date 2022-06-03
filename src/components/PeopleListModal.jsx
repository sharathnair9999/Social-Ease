import React, { useEffect, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";
import { getUserDetails } from "../services";
import PersonCard from "./PersonCard";

const PeopleListModal = React.forwardRef(
  ({ text, people, setShowModal }, ref) => {
    useOnClickOutside(ref, () => setShowModal(false));

    const [peopleInfo, setPeopleInfo] = useState([]);

    useEffect(() => {
      (async () => {
        const ans = [];
        for await (const person of people) {
          const userInfo = await getUserDetails(person);
          ans.push(userInfo);
        }
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
        <section className=" max-h-[21rem] overflow-y-auto flex justify-start items-start gap-4 flex-col">
          {peopleInfo?.map((person, id) => (
            <PersonCard key={id} user={person} />
          ))}
        </section>
      </div>
    );
  }
);
export default PeopleListModal;
