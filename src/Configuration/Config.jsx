// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnS0yKqHTAScNXDkkxwjXcaOn1emCldM4",
  authDomain: "expense-tracker-32c78.firebaseapp.com",
  projectId: "expense-tracker-32c78",
  storageBucket: "expense-tracker-32c78.firebasestorage.app",
  messagingSenderId: "596597614725",
  appId: "1:596597614725:web:809b8c2ed9e7a02d1161ec",
  measurementId: "G-B8LRDLT918"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication=getAuth(app)
export const db=getFirestore(app);