// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "yourwords-30bbe.firebaseapp.com",
  projectId: "yourwords-30bbe",
  storageBucket: "yourwords-30bbe.firebasestorage.app",
  messagingSenderId: "221936838174",
  appId: "1:221936838174:web:07d716af7a78db01a0b00f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app