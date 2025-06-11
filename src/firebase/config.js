import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG
    ? JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)
    : "";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
