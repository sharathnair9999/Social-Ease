import React from "react";
import Button from "./Button";

const PersonCard = ({ id }) => {
  return (
    <div className="flex justify-start items-center gap-2 w-full shadow-md p-1">
      <img
        src={
          "https://lh3.googleusercontent.com/a-/AOh14GgbjT5Falp276vt_d-EEBSWKgflhT__G-qKQQFc5vU=s96-c"
        }
        alt="sharath"
        className="w-10 h-10 rounded-full"
      />
      <section className="flex justify-start items-start gap-0 flex-col">
        <p className="text-md font-medium">{"Sharath Nair"}</p>
        <p className="text-sm font-normal">{"@sharathnair9999"}</p>
      </section>
      <Button
        className={`ml-auto ${
          id % 2 === 0 ? "bg-cta-dark text-white" : " text-cta-dark"
        } text-sm`}
      >
        {id % 2 === 0 ? "Following" : "Follow"}
      </Button>
    </div>
  );
};

export default PersonCard;
