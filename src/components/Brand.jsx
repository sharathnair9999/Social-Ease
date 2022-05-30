import React from "react";
import { Link } from "react-router-dom";
import { constants } from "../helpers";

const Brand = ({ full, logo, name }) => {
  return (
    <header>
      <Link to={"/feed"} className="flex justify-start items-center gap-2">
        <img
          src={constants.imgUrls.appLogo}
          alt="app logo"
          className={`w-10 ${(full || logo) && "block"} ${name && "hidden"} `}
        />
        <span
          className={` ${(name || full) && "block"} ${
            logo && "hidden"
          } font-satisfy font-bold  text-transparent text-4xl p-1 bg-clip-text bg-gradient-to-r from-cta-dark to-accent-1`}
        >
          SocialEase
        </span>
      </Link>
    </header>
  );
};

export default Brand;
