import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { handleChange } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Input from "./components/Input";
import { Brand } from "../../components";
import { googleSignInHandler } from "./helpers";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const initialCredentialState = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initialCredentialState);
  const loginUser = async (e, email, password) => {
    e.preventDefault();
    const {
      user: { providerData, uid },
    } = await signInWithEmailAndPassword(auth, email, password);
    console.log(providerData);
    console.log(uid);
  };

  const signInWithGoogle = () => {
    googleSignInHandler();
  };

  return (
    <div className=" h-screen flex flex-col justify-start items-center md:flex-row ">
      <div className="w-full left p-4 bg-light-1 h-1/2 md:h-full flex flex-col justify-start items-start ">
        <Brand full />
        <form
          onSubmit={(e) =>
            loginUser(e, credentials.email, credentials.password)
          }
          className="flex justify-center items-center gap-2 flex-col w-full mb-auto md:mt-40"
        >
          <p className="font-light text-2xl flex justify-center items-center gap-4">
            Sign In to <Brand logo />
          </p>
          <button
            type="button"
            className="flex justify-center items-center gap-2 w-10 h-10 rounded-full bg-white  text-sm"
            onClick={signInWithGoogle}
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
          <button
            type="submit"
            className="text-white font-bold text-sm bg-cta-dark px-4 py-2 rounded-md relative top-0 hover:top-[-4px] transition-all duration-200 shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
      <div className="font-montserrat w-full right bg-accent-2 h-1/2 md:h-full  p-4 flex flex-col justify-center gap-4 items-center text-light-1">
        <h1 className="text-xl font-bold italic ">New Here?</h1>
        <p className="font-extrabold text-3xl flex flex-wrap gap-x-4">
          <span className="bg-gradient-to-r bg-clip-text text-transparent from-cta-dark to-accent-1">
            Socialize
          </span>
          with
          <span className="bg-gradient-to-r bg-clip-text text-transparent from-cta-dark to-accent-1">
            Ease
          </span>
          that you've had never before
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="text-sm text-accent-2 font-bold  px-4 py-2 rounded-md relative top-0 hover:top-[-4px] transition-all duration-200 shadow-lg bg-cta-light/90 "
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
