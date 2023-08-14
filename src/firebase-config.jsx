import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD_PcHo2v-ED_zAbPuoW_nQ6RFrTWgGf0Q",
    authDomain: "simple-moives.firebaseapp.com",
    projectId: "simple-moives",
    storageBucket: "simple-moives.appspot.com",
    messagingSenderId: "984673127349",
    appId: "1:984673127349:web:c12ce403d7ad53814e27fc",
};

const app = initializeApp(firebaseConfig);
// init services

export const db = getFirestore(app);
export const auth = getAuth(app);
