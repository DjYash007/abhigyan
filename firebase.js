import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7QanMxCuZrxjP1kQ40N2NRe2nD1Vsefo",
  authDomain: "nextyou1-f174f.firebaseapp.com",
  databaseURL: "https://nextyou1-f174f-default-rtdb.firebaseio.com",
  projectId: "nextyou1-f174f",
  storageBucket: "nextyou1-f174f.firebasestorage.app",
  messagingSenderId: "891347710844",
  appId: "1:891347710844:web:b181bb2f18089fe8ce2af9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app); //  THIS WAS MISSING

const provider = new GoogleAuthProvider();

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

export { onAuthStateChanged };
