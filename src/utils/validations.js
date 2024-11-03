export const getFirebaseErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/email-already-in-use": "The email address is already registered.",
    "auth/invalid-email": "The email address is not valid.",
    "auth/user-not-found": "No user found with this email. Please sign up first.",
    "auth/weak-password": "The password is too weak. Use at least 8 characters, including letters, numbers, and symbols.",
    "auth/wrong-password": "The password is incorrect. Please try again.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/too-many-requests": "Too many login attempts. Please try again later.",
    "auth/operation-not-allowed": "Email/password login is disabled. Please contact support.",
    "auth/invalid-credential": "Invalid credentials.",
  };

  return errorMessages[errorCode] || "An unknown error occurred. Please try again.";
};

