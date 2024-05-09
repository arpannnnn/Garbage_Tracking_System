// Import the functions you need from the SDKs you need



import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const customAuth = getAuth(app);
