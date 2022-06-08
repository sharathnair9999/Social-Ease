import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Brand from "../Brand";
import Button from "./components/Button";
import { logout } from "../../services";
import Searchbar from "../Searchbar";

const TopNav = () => {
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  window.addEventListener("scroll", changeNavbarColor);

  return (
    <div
      className={` ${
        colorChange ? "bg-cta-light " : "bg-transparent"
      } flex justify-between items-center p-2 fixed left-0 right-0 top-0 h-14 transition-all z-[1]`}
    >
      <Brand full />
      <Searchbar />
      {authState.isLoggedIn && (
        <Button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      )}
      {!authState.isLoggedIn && (
        <Button onClick={() => navigate("/login")}>Login</Button>
      )}
    </div>
  );
};

export default TopNav;
