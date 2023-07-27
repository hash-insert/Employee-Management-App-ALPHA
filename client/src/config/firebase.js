import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAd7u7UqCREE2BBi3zS4MY47ykV57dqzuw",
  authDomain: "employeemanagementauth-1bd78.firebaseapp.com",
  projectId: "employeemanagementauth-1bd78",
  storageBucket: "employeemanagementauth-1bd78.appspot.com",
  messagingSenderId: "227069726047",
  appId: "1:227069726047:web:2070b45b20e4f30394baea",
  measurementId: "G-PL68XMB5NR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
