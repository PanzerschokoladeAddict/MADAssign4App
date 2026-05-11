// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUsK-Qcb2Vpf8YXLbZyVHehRIg077vkgg",
  authDomain: "stemmapp.firebaseapp.com",
  projectId: "stemmapp",
  storageBucket: "stemmapp.firebasestorage.app",
  messagingSenderId: "27361935846",
  appId: "1:27361935846:web:c7e1224897e0c8214a9627",
  measurementId: "G-3ZJQY4ZYBP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
