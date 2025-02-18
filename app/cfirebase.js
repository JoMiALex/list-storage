// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: " ",
  authDomain: "list-storage-db.firebaseapp.com",
  projectId: "list-storage-db",
  storageBucket: "list-storage-db.firebasestorage.app",
  messagingSenderId: "583557702364",
  appId: "1:583557702364:web:4fb2f30ba21059b16dca19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);