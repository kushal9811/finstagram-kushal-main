// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "finsta-kushal.firebaseapp.com",
  projectId: "finsta-kushal",
  storageBucket: "finsta-kushal.firebasestorage.app",
  messagingSenderId: "636306194950",
  appId: "1:636306194950:web:994b2eaaf7021e94577987"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);