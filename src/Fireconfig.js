import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDwiw6viyDyDkEy2E1O5x9d8Bp87mZGxU",
    authDomain: "authuser-887be.firebaseapp.com",
    projectId: "authuser-887be",
    storageBucket: "authuser-887be.appspot.com",
    messagingSenderId: "524703272090",
    appId: "1:524703272090:web:2d640587b3f70b4582a323"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;