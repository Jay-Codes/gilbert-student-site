import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  where,
  query,
  collection,
  getDocs,
} from 'firebase/firestore';
import { setUser } from '../redux/userReducer';
import { setProjects } from '../redux/ProjectReducer';
import { db } from '.';
import { store } from '../redux/store';
import { getProjects, getAllProjects } from './projects';

export let auth = null;
async function setCurrentUser(user, uid) {
  const dispatch = store.dispatch;
  const currentUser = store.getState().currentUser.user;
  dispatch(setUser(currentUser ? { ...currentUser, ...user } : user));

  // Set projects
  await getAllProjects();
  return user;
}

export function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      const dispatch = store.dispatch;
      dispatch(setUser(null));
    })
    .catch((error) => {
      // An error happened.
    });
  window.location = '/login';
}

export default function initializeAuth() {
  auth = getAuth();
  const nemail = sessionStorage.getItem('projectAppEmail')
  const npassword =  sessionStorage.getItem('projectAppPassword')
  const email = nemail ? nemail : "josephjchuchu@gmail.com"
  const password = npassword ? npassword : "1234567890"
  signInWithEmailAndPassword(auth, email, password);
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const ref = doc(db, 'users', uid);
      const userSnap = await getDoc(ref);
      if (userSnap.exists()) {
        const user = userSnap.data();
        user.uid = uid;
        await setCurrentUser(user, uid);
      } else {
        console.log('No such document!');
      }

      // ...
    } else {
      // User is signed out
      // ...
      console.log('what');
    }
  });
  return { auth };
}
