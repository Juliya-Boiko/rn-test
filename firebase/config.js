import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOraueXzAwvf--yZHCQCb0bQUGs_462nc",
  authDomain: "rn-test-79822.firebaseapp.com",
  projectId: "rn-test-79822",
  storageBucket: "rn-test-79822.appspot.com",
  messagingSenderId: "782615600443",
  appId: "1:782615600443:web:9b9a249ae5be883754ab1e",
  measurementId: "G-0M9B60GKGH",
  databaseURL: "https://rn-test-79822-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

