import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);
