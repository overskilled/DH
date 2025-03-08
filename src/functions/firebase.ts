// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq9T5LIlhRRdiPvWMK6a9OZWFVmtt9UeQ",
  authDomain: "dh-project-34594.firebaseapp.com",
  projectId: "dh-project-34594",
  storageBucket: "dh-project-34594.firebasestorage.app",
  messagingSenderId: "267912644015",
  appId: "1:267912644015:web:c8a1df6099293cc5dc9b5a",
  measurementId: "G-PXCBQBXFV5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
