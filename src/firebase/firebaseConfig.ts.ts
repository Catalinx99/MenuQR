import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Dacă vrei analytics doar în producție, o poți lăsa deoparte momentan

const firebaseConfig = {
  apiKey: "AIzaSyDeWaoFCdklXan0ZTZiXjWnls-7noBD3J0",
  authDomain: "qrmenu99.firebaseapp.com",
  projectId: "qrmenu99",
  storageBucket: "qrmenu99.firebasestorage.app",
  messagingSenderId: "213426756464",
  appId: "1:213426756464:web:3d26b21ecfd62029238db5",
  measurementId: "G-FG8FMQC0S5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth pentru login/register
export const auth = getAuth(app);
export const db = getFirestore(app);
