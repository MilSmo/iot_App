// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4nlcM8q7dlfdZ-LzFlr8Q7Q8Lr5Nps00",
  authDomain: "iot-app-e2315.firebaseapp.com",
  projectId: "iot-app-e2315",
  storageBucket: "iot-app-e2315.appspot.com",
  messagingSenderId: "952572266603",
  appId: "1:952572266603:web:5b0a55903cd8f46495c92e"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);