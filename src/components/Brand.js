import React from "react";
import { constants } from "../helpers";

const Brand = ({ full, logo, name }) => {
  return (
    <header className="flex justify-start items-center gap-2">
      <img
        src={constants.imgUrls.appLogo}
        alt="app logo"
        className={`w-10 ${(full || logo) && "block"} ${name && "hidden"} `}
      />
      <h1
        className={` ${(name || full) && "block"} ${
          logo && "hidden"
        } font-satisfy font-bold  text-transparent text-4xl p-1 bg-clip-text bg-gradient-to-r from-cta-dark to-accent-1`}
      >
        SocialEase
      </h1>
    </header>
  );
};

export default Brand;
