// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCQxdkRbotjGC6dbflMdb1vVydk64JV94",
  authDomain: "cs35l-857f3.firebaseapp.com",
  databaseURL: "https://cs35l-857f3-default-rtdb.firebaseio.com",
  projectId: "cs35l-857f3",
  storageBucket: "cs35l-857f3.appspot.com",
  messagingSenderId: "700776400483",
  appId: "1:700776400483:web:6e18c19486c93cd4e65a56",
  measurementId: "G-RD50S5DH24",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
