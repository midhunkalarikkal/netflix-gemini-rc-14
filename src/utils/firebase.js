// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO_VGWT50JjSTU-cDYkNvZJ5s_QKLJUkM",
  authDomain: "netflix-rcgpt.firebaseapp.com",
  projectId: "netflix-rcgpt",
  storageBucket: "netflix-rcgpt.appspot.com",
  messagingSenderId: "564465898368",
  appId: "1:564465898368:web:1753f01687f466ea2be765",
  measurementId: "G-5RPF1H1WBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

