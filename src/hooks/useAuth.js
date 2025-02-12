import { useState } from "react";
import { toast } from 'react-toastify';
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { getFirebaseErrorMessage } from "../utils/validations";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateProfile } from "firebase/auth";

export const useAuth = () => {
  const [errMessage, setErrMessage] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (data, reset) => {
    setSubmitLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: data.name });
      await sendEmailVerification(user);

      reset();
      setSubmitLoading(false);
      toast.success("Verification email sent. Please check your email.");

      const interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
          toast.success(`Welcome ${user.displayName}`);
          navigate("/browse");
        }
      }, 1000);
    } catch (error) {
      setErrMessage(getFirebaseErrorMessage(error.code));
      setSubmitLoading(false);
      toast.error("Sign up failed. Please try again.");
    }
  };

  const handleSignIn = async (data, reset) => {
    setSubmitLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      if (user.emailVerified) {
        reset();
        toast.success(`Welcome ${user.displayName}`);
        navigate("/browse");
      } else {
        toast.error("Please verify your email before signing in.");
      }
    } catch (error) {
      setErrMessage(getFirebaseErrorMessage(error.code));
      toast.error("Sign in failed. Please check your credentials.");
    }
    setSubmitLoading(false);
  };

  const handleForgotPassword = async (email, reset) => {
    setSubmitLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      reset();
      toast.success("Email sent successfully!");
    } catch (error) {
      setErrMessage(getFirebaseErrorMessage(error.code));
    }
    setSubmitLoading(false);
  };

  return { handleSignUp, handleSignIn, handleForgotPassword, errMessage, submitLoading };
};
