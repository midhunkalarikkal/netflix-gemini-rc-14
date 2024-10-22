import React, { useState } from "react";
import Header from "./Header";

const Login = () => {

  const [isSignInForm , setIsSignInForm] = useState(true)
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-1 opacity-50" />
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_large.jpg"
          alt=""
        />
      </div>
      <form className="absolute p-12 bg-black w-3/12 flex flex-col my-64 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-black text-white bg-opacity-20 border-[1px] border-gray-300 rounded-md focus:border-white focus:outline-none"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-black text-white bg-opacity-20 border-[1px] border-gray-300 rounded-md focus:border-white focus:outline-none"
        />
        <input
          type="Password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-black text-white bg-opacity-80 border-[1px] border-gray-300 rounded-md focus:border-white focus:outline-none"
        />
        <button className="px-4 py-2 my-2 w-full font-semibold rounded-md" style={{ backgroundColor: '#E50914' }}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to netflix? Sign Up." : "Already registered? Sign In Now."}</p>
      </form>
    </div>
  );
};

export default Login;
