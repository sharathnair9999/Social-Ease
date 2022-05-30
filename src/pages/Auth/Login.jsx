import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { handleChange } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Input from "./components/Input";
import { Brand } from "../../components";
import { googleSignInHandler } from "./helpers";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../../components";
import { toast } from "react-toastify";
import { capitalize } from "../../helpers/constants";

const Login = () => {
  const navigate = useNavigate();
  const initialCredentialState = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initialCredentialState);
  const loginUser = async (e, enteredEmail, password) => {
    e.preventDefault();
    const {
      user: { displayName },
    } = await signInWithEmailAndPassword(auth, enteredEmail, password);
    toast.success(`Welcome Back ${capitalize(displayName)}!`);
  };

  const loginWithGoogle = async () => {
    await googleSignInHandler();
    navigate("/feed");
  };

  return (
    <div className="h-[calc(100vh-8.3rem)] flex flex-col justify-start items-start md:flex-row  ">
      <div className="w-full  p-4 bg-light-1 h-full  flex flex-col justify-start  items-start ">
        <Brand full />
        <form
          onSubmit={(e) =>
            loginUser(e, credentials.email, credentials.password)
          }
          className="flex justify-center items-center gap-2 flex-col w-full mb-auto md:my-auto"
        >
          <section className="font-light text-2xl flex justify-center items-center gap-4">
            Sign In to <Brand logo />
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
            placeholder="******"
            name="password"
            value={credentials.password}
            onChange={(e) => handleChange(e, setCredentials)}
          />
          <Button type="submit" className="text-white bg-cta-dark font-bold">
            Login
          </Button>
        </form>
      </div>
      <div className="font-montserrat w-full  bg-accent-2 h-full p-4 flex flex-col justify-center gap-4 items-center text-light-1">
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
          onClick={() => navigate("/signup")}
          className=" text-accent-2 bg-cta-light/90"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;
