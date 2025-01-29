import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addUser } from "../utils/userSlice";
import { LOGIN_BG_IMAGE } from "../utils/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getFirebaseErrorMessage } from "../utils/validations";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isForgotPasswordForm, setIsForgotPasswordForm] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrMessage(null);
    setIsForgotPasswordForm(false);
  };

  const toggleToForgotPassword = () => {
    setIsForgotPasswordForm((prev) => !prev);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please fix the errors before submitting the form.");
      return;
    }
    setSubmitLoading(true);
    if (isForgotPasswordForm) {
      sendPasswordResetEmail(auth, data.email)
        .then(() => {
          reset();
          setSubmitLoading(false);
          toast.success("Email sended successfully!");
        })
        .catch((error) => {
          setSubmitLoading(false);
          setErrMessage(getFirebaseErrorMessage(error.code));
        });
    } else if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.name,
        })
        .then(() => {
          sendEmailVerification(user)
            .then(() => {
              reset();
              setSubmitLoading(false);
              toast.success("Verification email sent. Please check your email.")
              const interval = setInterval(() => {
                user.reload().then(() => {
                  if (user.emailVerified) {
                    clearInterval(interval);
                    dispatch(
                      addUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                      })
                    );
                    toast.success("Email verified!");
                    toast.success("Welcome "+user.displayName);
                    navigate("/browse")
                  }
                });
              }, 1000);
            })
            .catch((error) => {
              setSubmitLoading(false);
              setErrMessage(error.message);
              toast.error(error.message);
            });
        });
      })
      .catch((error) => {
        setSubmitLoading(false);
        setErrMessage(getFirebaseErrorMessage(error.code));
        toast.error("Sign up failed. Please try again.");
      });
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          reset();
          setSubmitLoading(false);
          toast.success("Welcome " + user.displayName);
          navigate("/browse");
        } else {
          setSubmitLoading(false);
          toast.error("Please verify your email before signing in.");
        }
      })
      .catch((error) => {
        setSubmitLoading(false);
        setErrMessage(getFirebaseErrorMessage(error.code));
        toast.error("Sign in failed. Please check your credentials.");
      });
    }
  };

  return (
    <>
      <Header />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-50"></div>
        <img
          className="w-screen h-screen sm:h-[90vh] object-cover"
          src={LOGIN_BG_IMAGE}
          alt="background_image"
        />
      </div>

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
        )}

        <p
          className="py-4 cursor-pointer text-sm md:text-md -mt-1 mb-2"
          onClick={toggleSignInForm}
        >
          {isSignInForm ? (
            <span>
              <span className="custom-text-color"> New to Netflix?</span> Sign
              Up.
            </span>
          ) : (
            <span>
              <span className="custom-text-color cursor-pointer">Already registered?</span>{" "}
              Sign In Now.
            </span>
          )}
        </p>

        {isForgotPasswordForm && (
          <p className="text-xs md:text-[13px] custom-text-color pb-6">
            If your email is registered, you will receive a password reset email shortly.
          </p>
        )}

        <p
          className={`text-xs md:text-[13px] custom-text-color ${
            isSignInForm ? "pb-10 md:pb-28" : "pb-2"
          }`}
        >
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-600">Learn more.</span>
        </p>
      </form>
      <Footer />
    </>
  );
};

export default Login;
