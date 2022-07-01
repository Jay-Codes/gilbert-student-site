import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import  initializeAuth  from './auth';
const firebaseConfig = {
  apiKey: "AIzaSyCU5fX3BaEeCHNvdaDvUzXJGjLLReO9gd8",
  authDomain: "collaboration-platform-fbbab.firebaseapp.com",
  projectId: "collaboration-platform-fbbab",
  storageBucket: "collaboration-platform-fbbab.appspot.com",
  messagingSenderId: "626240305977",
  appId: "1:626240305977:web:73339565890922cd3146e8",
  measurementId: "G-MW8CL8CNW6"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth()