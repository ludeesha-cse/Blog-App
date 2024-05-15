// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-6fb3b.firebaseapp.com",
  projectId: "mern-blog-app-6fb3b",
  storageBucket: "mern-blog-app-6fb3b.appspot.com",
  messagingSenderId: "854425176404",
  appId: "1:854425176404:web:14ddeb1a6b955e4e0ea0c1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);