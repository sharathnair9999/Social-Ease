import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MdOutlineFeed, MdExplore, MdPeopleAlt } from "react-icons/md";
import { universalSnapShotDoc, userDocQuerybyId } from "../../services";

const SideNav = () => {
  const { isLoggedIn, uid } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    photoURL: "",
    username: "",
  });

  useEffect(() => {
    const unsubscribe =
      uid && universalSnapShotDoc(userDocQuerybyId(uid), setUserInfo, "uid");

    return uid ? unsubscribe : () => {};
  }, [uid]);

  const links = [
    {
      url: "/feed",
      display: "My Feed",
      icon: <MdOutlineFeed size={"1.5rem"} />,
      protectedLink: true,
    },
    {
      url: "/explore",
      display: "Explore",
      icon: <MdExplore size={"1.5rem"} />,
      protectedLink: false,
    },
    {
      url: "/people",
      display: "People",
      icon: <MdPeopleAlt size={"1.5rem"} />,
      protectedLink: false,
    },
    {
      url: `/profile/${uid}`,
      display: "My Profile",
      icon: (
        <img
          src={userInfo.photoURL}
          alt={userInfo.displayName}
          className="w-6 h-6 md:h-10 md:w-10 rounded-full object-cover"
        />
      ),
      protectedLink: true,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-[1] right-0 md:h-[calc(100vh)] md:max-w-[10rem] md:top-20 md:pt-1 md:left-3 bg-cta-light md:bg-transparent  ">
      <ul className="flex justify-between items-center md:justify-start  md:items-start md:flex-col md:gap-4  ">
        {links.map(({ url, display, icon, protectedLink }, id) => (
          <li key={id} className="lg:w-[10rem]">
            <NavLink
              to={url}
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? "bg-cta-dark md:bg-cta-light text-white md:text-black md:border-cta-dark md:shadow-lg"
                    : "bg-transparent"
                } md:flex-row flex-col  justify-start items-center gap-1 md:gap-2 px-2 py-1 rounded-md text-xs md:text-lg ${
                  protectedLink ? (!isLoggedIn ? "hidden" : "flex") : "flex"
                }`
              }
            >
              {icon}
              <span className="md:hidden lg:block">{display}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
