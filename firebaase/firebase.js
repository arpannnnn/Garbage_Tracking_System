// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <-- Ensure this import is present

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAVhR0y5IzHmYNZUF8Es3znArvVBRKnY0",
  authDomain: "authapi-c7734.firebaseapp.com",
  projectId: "authapi-c7734",
  storageBucket: "authapi-c7734.appspot.com",
  messagingSenderId: "947613023347",
  appId: "1:947613023347:web:d032cdd12b6a02501dbe06",
  measurementId: "G-RJG8TYCNXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const customAuth = getAuth(app); // <-- This should now work
