import React from "react";
import { LOGIN_BG_IMAGE } from "../utils/constants";

const BackGroundImageWithShade = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-50"></div>
      <img
        className="w-screen h-screen sm:h-[90vh] object-cover"
        src={LOGIN_BG_IMAGE}
        alt="background_image"
      />
    </div>
  );
};

const PasswordResetEmail = () => {
  return (
    <p className="text-xs md:text-[13px] custom-text-color pb-6">
      If your email is registered, you will receive a password reset email
      shortly.
    </p>
  );
};

const SignInNow = () => {
  return (
    <span>
      <span className="custom-text-color cursor-pointer">
        Already registered?
      </span>
      Sign In Now.
    </span>
  );
};

const SignUpNow = () => {
  return (
    <span>
      <span className="custom-text-color"> New to Netflix?</span> Sign Up.
    </span>
  );
};

const OrSignInWithCode = () => {
  return (
    <>
      <span className="px-2 text-gray-300 opacity-80 text-center text-sm md:text-md py-1 md:py-2">
        OR
      </span>

      <button
        className="px-4 py-1 md:py-2 my-1 w-full font-semibold rounded-[4px] bg-white bg-opacity-25 hover:bg-opacity-20 transition duration-200 ease-in-out transform"
        disabled
      >
        Use a sign-in code
      </button>
    </>
  );
};

const FormBottomSection = ({toggleToForgotPassword}) => {
    return (
        <>
            <span className="px-2 text-gray-300 opacity-80 text-center text-sm md:text-md py-1 md:py-2">
              OR
            </span>

            <button className="px-4 py-1 md:py-2 my-1 w-full font-semibold rounded-[4px] bg-white bg-opacity-25 hover:bg-opacity-20 transition duration-200 ease-in-out transform" disabled>
              Use a sign-in code
            </button>

            <p
              className="my-2 text-sm md:text-md text-center text-white hover:text-[#b6b5b4] hover:underline cursor-pointer"
              onClick={toggleToForgotPassword}
            >
              Forgot password?
            </p>

            <div className="flex items-center text-sm md:text-md mt-2">
              <input
                className="h-4 w-4 cursor-pointer custom-checkbox rounded-[4px]"
                type="checkbox"
                id="rememberMe"
              />
              <label htmlFor="rememberMe" className="ml-2">
                Remember me
              </label>
            </div>
          </>
    )
}


export {
  BackGroundImageWithShade,
  PasswordResetEmail,
  SignInNow,
  SignUpNow,
  OrSignInWithCode,
  FormBottomSection
};
