import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7TcpnWZO6WL3wM1HiNEMLt4gQ4JpAG4I",
  authDomain: "marketplace-a98b2.firebaseapp.com",
  databaseURL: "https://marketplace-a98b2-default-rtdb.firebaseio.com",
  projectId: "marketplace-a98b2",
  storageBucket: "marketplace-a98b2.firebasestorage.app",
  messagingSenderId: "66949501925",
  appId: "1:66949501925:web:e46b2e63510e3906b2950c",
  measurementId: "G-1HN05D9Q6X"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);