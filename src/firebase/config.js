
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBAdR0yOeELmGN6yvUzejmNUqNum6giQQ4",
  authDomain: "style-f0ae4.firebaseapp.com",
  projectId: "style-f0ae4",
  storageBucket: "style-f0ae4.appspot.com",
  messagingSenderId: "907382114891",
  appId: "1:907382114891:web:c236274523aee559261bce"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db =  getFirestore(app)


export{db}

