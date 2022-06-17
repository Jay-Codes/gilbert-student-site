import  { getAuth,onAuthStateChanged, signOut, signInWithEmailAndPassword, setPersistence,browserSessionPersistence }  from 'firebase/auth'
import { doc, getDoc ,where,query,collection,getDocs } from 'firebase/firestore'
import { setUser  } from '../redux/userReducer'
import { setProjects } from '../redux/ProjectReducer'
import { db } from '.'
import { store } from '../redux/store'
import { getProjects, getAllProjects} from './projects'

export let auth = null;
async function setCurrentUser(user,uid){
    const dispatch = store.dispatch
    const currentUser = store.getState().currentUser.user
    dispatch(setUser( currentUser ? {...currentUser,...user} : user))

    // Set projects
    dispatch(setProjects(await getAllProjects()))
    return user
}

export function logOut(){
    signOut(auth).then(() => {
      // Sign-out successful.
        const dispatch = store.dispatch
        dispatch(setUser( null))
        window.location='/login'
    }).catch((error) => {
      // An error happened.
    });
}

export default function initializeAuth(){
    auth = getAuth();
    const nemail = sessionStorage.getItem('projectAppEmail')
    const npassword =  sessionStorage.getItem('projectAppPassword')
<<<<<<< HEAD
    const email = nemail ? nemail : "josephjchuchu@gmail.com"
    const password = npassword ? npassword : "0987654321"
=======
    const email = nemail ? nemail : "mboyakgilbert@gmail.com"
    const password = npassword ? npassword : "gilbert123"
>>>>>>> 4bdf4e8104f8df0574218d2f047ffcec30349dab
    signInWithEmailAndPassword(auth,email,password)
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
          const ref = doc(db,'users',uid)
          const userSnap = await getDoc(ref);

          if (userSnap.exists()) {
            const user = userSnap.data();
            user.uid = uid
            await setCurrentUser(user,uid)
              
          } else {
              console.log("No such document!");
          }
  
            // ...
          } else {
            // User is signed out
            // ...
          }
    });
    return {auth}
}