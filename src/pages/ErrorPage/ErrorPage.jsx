import React from "react";
import { Link } from "react-router-dom";
import { Brand } from "../../components";

const ErrorPage = () => {
  return (
    <div className="flex justify-start items-center h-screen bg-cta-light flex-col">
      <Brand full medium />
      <p className="text-5xl font-bold mt-20">Page Does Not Exist</p>
      <Link to={"/explore"} className="mt-20 underline underline-offset-4 ">
        Explore New Posts
      </Link>
    </div>
  );
};

export default ErrorPage;
