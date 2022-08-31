import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDO5-3KOHz1grVRKfkXvBk2U0Evh1rQVnk",
    authDomain: "react-firebase-crud-a7190.firebaseapp.com",
    projectId: "react-firebase-crud-a7190",
    storageBucket: "react-firebase-crud-a7190.appspot.com",
    messagingSenderId: "598301825000",
    appId: "1:598301825000:web:93124aa65fba2e462ff65d",
    measurementId: "G-GBQ2Y5R7GH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);