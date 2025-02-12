import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { BackGroundImageWithShade, FormBottomSection, PasswordResetEmail, SignInNow, SignUpNow } from "./LoginComponents";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isForgotPasswordForm, setIsForgotPasswordForm] = useState(false);
  const { handleSignUp, handleSignIn, handleForgotPassword, errMessage, submitLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ mode: "onChange" });

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setIsForgotPasswordForm(false);
  };

  const toggleToForgotPassword = () => {
    setIsForgotPasswordForm(!isForgotPasswordForm);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please fix the errors before submitting the form.");
      return;
    }
    if (isForgotPasswordForm) {
      handleForgotPassword(data.email, reset);
    } else if (!isSignInForm) {
      handleSignUp(data, reset);
    } else {
      handleSignIn(data, reset);
    }
  };

  return (
    <>
      <Header />
      <BackGroundImageWithShade />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute py-10 px-14 md:px-16 bg-black w-[85%] sm:w-[70%] md:w-[430px] flex flex-col top-20 left-1/2 transform -translate-x-1/2 text-white bg-opacity-75"
      >
        <h1 className="font-bold text-2xl lg:text-3xl py-1 lg:py-3 mb-3">
          {isForgotPasswordForm
            ? "Forgot Password"
            : isSignInForm
            ? "Sign In"
            : "Sign Up"}
        </h1>

        {!isSignInForm && !isForgotPasswordForm && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 my-1 md:p-4 md:my-2 w-full bg-gray-400 text-white bg-opacity-10 border-[1px] rounded-[4px] focus:border-white focus:outline-none custom-input"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z_]{5,20}$/,
                  message: "Enter a valid name.",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm md:text-md">
                {errors.name.message}
              </p>
            )}
          </>
        )}

        <>
          <input
            type="text"
            placeholder="Email Id"
            className="p-2 my-1 md:p-4 md:my-2 w-full bg-gray-400 text-white bg-opacity-10 border-[1px] rounded-[4px] focus:border-white focus:outline-none custom-input"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Enter a valid email.",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm md:text-md">
              {errors.email.message}
            </p>
          )}
        </>

        {!isForgotPasswordForm && (
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-2 my-1 md:p-4 md:my-2 w-full bg-gray-400 text-white bg-opacity-10 border-[1px] rounded-[4px] focus:border-white focus:outline-none custom-input"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters long.";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must include at least one uppercase letter.";
                  }
                  if (!/[a-z]/.test(value)) {
                    return "Password must include at least one lowercase letter.";
                  }
                  if (!/\d/.test(value)) {
                    return "Password must include at least one number.";
                  }
                  if (!/[!@#$%^&*]/.test(value)) {
                    return "Password must include at least one special character (!@#$%^&*).";
                  }
                  return true;
                }
              })}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300 opacity-75"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
        )}
        {errors.password && (
          <p className="text-red-500 text-sm md:text-md">
            {errors.password.message}
          </p>
        )}

        {errMessage && (
          <p className="py-2 my-1 font-semibold text-xs md:text-md text-red-600">
            {errMessage}
          </p>
        )}

        <button
          type="submit"
          className="px-4 py-1 mt-2 md:py-2 w-full font-semibold rounded-[4px]"
          style={{ backgroundColor: "#E50914" }}
        >
          {submitLoading 
          ? "Loading..." 
          : isForgotPasswordForm
            ? "Submit email"
            : isSignInForm
            ? "Sign In"
            : "Sign Up"}
        </button>

        {!isForgotPasswordForm  && (
          <FormBottomSection toggleToForgotPassword={toggleToForgotPassword}/>
        )}

        <p className="py-4 cursor-pointer text-sm md:text-md -mt-1 mb-2" onClick={toggleSignInForm}>
          {isSignInForm ? (
            <SignUpNow />
          ) : (
            <SignInNow />
          )}
        </p>

        {isForgotPasswordForm && (
          <PasswordResetEmail />
        )}

        <p
          className={`text-xs md:text-[13px] custom-text-color ${isSignInForm ? "pb-10 md:pb-28" : "pb-2"}`}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-600">Learn more.</span>
        </p>
      </form>
      <Footer />
    </>
  );
};

export default Login;
