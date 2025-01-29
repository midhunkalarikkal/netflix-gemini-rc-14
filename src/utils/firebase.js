import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBO_VGWT50JjSTU-cDYkNvZJ5s_QKLJUkM",
  authDomain: "netflix-rcgpt.firebaseapp.com",
  projectId: "netflix-rcgpt",
  storageBucket: "netflix-rcgpt.appspot.com",
  messagingSenderId: "564465898368",
  appId: "1:564465898368:web:1753f01687f466ea2be765",
  measurementId: "G-5RPF1H1WBT"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth()

