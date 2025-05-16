import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6RAx-26PuAPL382LuEErQ7oE1BEtEkDc",
    authDomain: "reactweatherapp-a7290.firebaseapp.com",
    projectId: "reactweatherapp-a7290",
    storageBucket: "reactweatherapp-a7290.firebasestorage.app",
    messagingSenderId: "841747031662",
    appId: "1:841747031662:web:5c0f0eda053f8291dfe87f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
