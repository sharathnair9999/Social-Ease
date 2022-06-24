import React, { useState } from "react";
import { handleChange } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { Brand, Spinner } from "../../components";
import { googleSignInHandler, loginUser } from "../../services";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../../components";

const Login = () => {
  const navigate = useNavigate();
  const initialCredentialState = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initialCredentialState);

  const loginWithGoogle = async () => {
    await googleSignInHandler();
    navigate("/feed");
  };

  const [guestLoading, setGuestLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  return (
    <div className="w-full  p-4 bg-light-1 h-screen  flex flex-col justify-start  items-start ">
      <Brand logo />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setUserLoading(true);
          await loginUser(credentials.email, credentials.password);
          setUserLoading(false);
        }}
        className="flex justify-center items-center gap-2 flex-col w-full mb-auto "
      >
        <section className="font-light text-2xl flex justify-center items-center gap-4">
          Sign In Using
        </section>
        <button
          type="button"
          className="flex justify-center items-center gap-2 w-10 h-10 rounded-full bg-white  text-sm"
          onClick={loginWithGoogle}
        >
          <FcGoogle size={"1.1rem"} />
        </button>
        <section className="relative w-full flex items-center justify-center">
          <hr className="w-1/2 border-1 border-accent-1-light my-2" />
          <span className="absolute top-[-5px] left-auto right-auto bg-light-1 px-2 font-light">
            OR
          </span>
        </section>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={credentials.email}
          required
          onChange={(e) => handleChange(e, setCredentials)}
        />
        <Input
          required
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={(e) => handleChange(e, setCredentials)}
        />
        <section className="flex justify-center items-center gap-4 mt-2">
          <Button type="submit" className="text-white bg-cta-dark font-bold">
            {userLoading ? <Spinner isPrimary={true} /> : "Login"}
          </Button>
          <Button
            type="button"
            disabled={guestLoading}
            onClick={async () => {
              setCredentials({
                email: process.env.REACT_APP_TESTER_EMAIL,
                password: process.env.REACT_APP_TESTER_PASSWORD,
              });

              setGuestLoading(true);
              await loginUser(
                process.env.REACT_APP_TESTER_EMAIL,
                process.env.REACT_APP_TESTER_PASSWORD
              );
              setGuestLoading(false);
            }}
            className="text-cta-dark bg-cta-light font-bold"
          >
            {guestLoading ? <Spinner isPrimary={false} /> : "Guest Login"}
          </Button>
        </section>
        <div className="w-full h-[1px] bg-cta-dark/10 mt-10"></div>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-bold italic ">New Here?</h1>
          <p className="font-extrabold text-3xl  gap-x-4">
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-cta-dark to-accent-1">
              Socialize{" "}
            </span>
            with{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-cta-dark to-accent-1">
              Ease{" "}
            </span>
            that you've had never before
          </p>
          <Button
            type="button"
            onClick={() => navigate("/signup")}
            className=" text-accent-2 bg-cta-light/90"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
