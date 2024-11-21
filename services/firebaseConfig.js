import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-ZKRKhE-E5RzcNlI_Hw7EDTq5D0XQuoY",
  authDomain: "pokedex-service.firebaseapp.com",
  projectId: "pokedex-service",
  storageBucket: "pokedex-service.firebasestorage.app",
  messagingSenderId: "619770058537",
  appId: "1:619770058537:web:fa5c80f89c19f3d4af0938"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);



export default app;