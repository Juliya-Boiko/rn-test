import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOraueXzAwvf--yZHCQCb0bQUGs_462nc",
  authDomain: "rn-test-79822.firebaseapp.com",
  projectId: "rn-test-79822",
  storageBucket: "rn-test-79822.appspot.com",
  messagingSenderId: "782615600443",
  appId: "1:782615600443:web:9b9a249ae5be883754ab1e",
  measurementId: "G-0M9B60GKGH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);