import Header from "./Header";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import React, { useRef, useState } from "react";
import { checkValidateData } from "../utils/validations";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { LOGIN_BG_IMAGE } from "../utils/constants";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errMessage, setErrMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSubmitButton = (e) => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );

    setErrMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="absolute">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-50" />
        <img
          className="w-screen h-[90vh]"
          src={LOGIN_BG_IMAGE}
          alt="background_image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute py-10 px-16 bg-black w-3/12 flex flex-col my-24 mx-auto right-0 left-0 text-white bg-opacity-75"
      >
        <h1 className="font-bold text-3xl py-3 mb-3">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-black text-white bg-opacity-20 border-[1px] border-gray-300 rounded-sm focus:border-white focus:outline-none"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-black text-white bg-opacity-20 border-[1px] border-gray-300 rounded-sm focus:border-white focus:outline-none"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-black text-white bg-opacity-80 border-[1px] border-gray-300 rounded-sm focus:border-white focus:outline-none"
        />
        <p className="py-2 font-semibold text-md text-red-600">{errMessage}</p>
        <button
          className="px-4 py-2 w-full font-semibold rounded-sm"
          style={{ backgroundColor: "#E50914" }}
          onClick={handleSubmitButton}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <span className="px-2 text-white text-center">OR</span>
        <button className="px-4 py-2 my-2 w-full font-semibold rounded-sm bg-white bg-opacity-25 hover:bg-opacity-20 transition duration-200 ease-in-out transform">
          Use a sign-in code
        </button>
        <Link to="/" className="my-2 text-center text-white">
          Forgot password?
        </Link>
        <div className="flex items-center my-2">
          <input className="h-4 w-4 cursor-pointer custom-checkbox rounded-sm" type="checkbox" id="rememberMe"/>
          <label htmlFor="rememberMe" className="ml-2">
            Remember me
          </label>
        </div>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? <span><span style={{ color : "##ffffffb3" }}> New to Netflix?</span> Sign Up.</span>
            : <span><span style={{ color : "##ffffffb3" }}>Already registered?</span> Sign In Now.</span>}
        </p>
        <p className="text-gray-400 text-[13px] pb-28">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-600">Learn more.</span>
        </p>
      </form>
    </>
  );
};

export default Login;
