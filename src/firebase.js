// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEhyrJuGLgbzWiMbWOCiQHfzT6z-rvenI",
  authDomain: "breweries-app-ab262.firebaseapp.com",
  databaseURL: "https://breweries-app-ab262-default-rtdb.firebaseio.com",
  projectId: "breweries-app-ab262",
  storageBucket: "breweries-app-ab262.appspot.com",
  messagingSenderId: "414827735085",
  appId: "1:414827735085:web:89830e62bb62cbd39530a4",
  measurementId: "G-4ELWFH0NPV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
export const storage = getStorage(app);
export const cloudDb = getFirestore(app);
