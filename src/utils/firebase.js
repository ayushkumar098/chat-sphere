
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBc5Muuq3wxlM6t9Z1htg_yCW8IHdGclro",
  authDomain: "chat-sphere-f1680.firebaseapp.com",
  projectId: "chat-sphere-f1680",
  storageBucket: "chat-sphere-f1680.appspot.com",
  messagingSenderId: "570128036887",
  appId: "1:570128036887:web:3880a82b0b1c11782b9852",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();


