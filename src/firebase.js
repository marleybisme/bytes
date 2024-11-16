// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAxvjOlAsdrBU6xXgiPUj2HyQ_q3QlE9ms",
  authDomain: "rattlers-byte.firebaseapp.com",
  projectId: "rattlers-byte",
  storageBucket: "rattlers-byte.firebasestorage.app",
  messagingSenderId: "1013192767562",
  appId: "1:1013192767562:web:82399f09af85569cd10eb3",
  measurementId: "G-W60HHQ2CPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { analytics, auth, db, collection, addDoc, onAuthStateChanged, doc, setDoc };