
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAesQKor3w6OSZW4F6J_F-wmZw3TDACPfo",
  authDomain: "reactlinketree-8a63c.firebaseapp.com",
  projectId: "reactlinketree-8a63c",
  storageBucket: "reactlinketree-8a63c.firebasestorage.app",
  messagingSenderId: "307602646981",
  appId: "1:307602646981:web:db4298f038b6fe59e24dac",
  measurementId: "G-K1FJ67ZFG6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const analytics = getAnalytics(app);

export {auth,db};