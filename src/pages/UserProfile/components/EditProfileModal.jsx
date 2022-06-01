import React from "react";
import { Button } from "../../../components";

const EditProfileModal = ({ setShowModal }) => {
  const cancelUpdate = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="md:w-2/4 w-full mx-2 bg-white/95 px-4 py-2 h-3/4 rounded-md shadow-xl flex justify-start items-start flex-col gap-2 z-20"
      onSubmit={handleSubmit}
    >
      <section className="flex justify-start items-center gap-2 mt-auto ml-auto mb-2">
        <Button type="submit" className="text-cta-dark bg-slate-50">
          Update
        </Button>
        <Button
          type="button"
          className="bg-red-700 text-white hover:bg-red-600"
          onClick={cancelUpdate}
        >
          Cancel
        </Button>
      </section>
    </form>
  );
};

export default EditProfileModal;
