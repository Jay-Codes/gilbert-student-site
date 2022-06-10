import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import  initializeAuth  from './auth';
const firebaseConfig = {
    apiKey: "AIzaSyAHJr5qgBOfV4EsTxWaAvWE8DCk76sD0wI",
    authDomain: "gilbert-project-7cbc1.firebaseapp.com",
    projectId: "gilbert-project-7cbc1",
    storageBucket: "gilbert-project-7cbc1.appspot.com",
    messagingSenderId: "64072108859",
    appId: "1:64072108859:web:77a2ed32f5eab7a8ca451e",
    measurementId: "G-B9FV9B669S"
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth()