import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔴 PASTE YOUR REAL CONFIG HERE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVsqHqUxA-M22n0mhcX5y8zSjqc2H0N2o",
  authDomain: "nextyou-feeee.firebaseapp.com",
  projectId: "nextyou-feeee",
  storageBucket: "nextyou-feeee.firebasestorage.app",
  messagingSenderId: "897802098138",
  appId: "1:897802098138:web:7b03179d09ee5809371ce3",
  measurementId: "G-07FME4E8QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export login function
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
