import React from "react";
import { useOnClickOutside } from "../custom-hooks";
import PersonCard from "./PersonCard";

const PeopleListModal = React.forwardRef(
  (
    { text, likesModal, followersModal, followingModal, people, setShowModal },
    ref
  ) => {
    useOnClickOutside(ref, () => setShowModal(false));
    return (
      <div
        ref={ref}
        className="w-2/4 bg-white/90 px-4 py-2 md:h-96 h-40 rounded-md shadow-xl "
      >
        <p className="underline underline-offset-4 text-cta-dark decoration-accent-2 mb-2">
          {text}
        </p>
        <section className=" max-h-[21rem] overflow-y-auto flex justify-start items-start gap-4 flex-col">
          {[...Array(20)].map((_, id) => (
            <PersonCard key={id} id={id} />
          ))}
        </section>
      </div>
    );
  }
);
export default PeopleListModal;
