import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJuCrzoBnMONwt6Q7rpgTSiRH9dbFkx9U",
  authDomain: "andam-storage.firebaseapp.com",
  projectId: "andam-storage",
  storageBucket: "andam-storage.appspot.com",
  messagingSenderId: "766101603358",
  appId: "1:766101603358:web:a9d33c7baeaf7b0f219a0f",
};

const app = initializeApp(firebaseConfig);

export default app;
