import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCticEmI8RFkA4I6p4ESVDyOd8VToAcGV4",
  authDomain: "mernai-ceac5.firebaseapp.com",
  projectId: "mernai-ceac5",
  storageBucket: "mernai-ceac5.firebasestorage.app",
  messagingSenderId: "1063175735464",
  appId: "1:1063175735464:web:4c604c1fbd228ef0229a9d",
  measurementId: "G-WQEJPKJY8J"
};

const app = initializeApp(firebaseConfig);

const auth =getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};