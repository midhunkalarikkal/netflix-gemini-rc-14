import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCzvIfxZd3yZmcNFRKpAZoWFwxqaEi48Fw",
  authDomain: "netflix-gemini-rc.firebaseapp.com",
  projectId: "netflix-gemini-rc",
  storageBucket: "netflix-gemini-rc.firebasestorage.app",
  messagingSenderId: "616008418575",
  appId: "1:616008418575:web:f4a42ef8a6f4bee2542a7a",
  measurementId: "G-P9WV0W9RP8"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth()

