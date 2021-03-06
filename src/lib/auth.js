import { getAuth,onAuthStateChanged, signOut, signInWithEmailAndPassword, setPersistence,browserSessionPersistence }  from 'firebase/auth'
import { doc, getDoc ,where,query,collection,getDocs } from 'firebase/firestore'
import { setUser  } from '../redux/userReducer'
import { setProjects,setAllProjects } from '../redux/projectState'
import { db } from '.'
import { store } from '../redux/store'
import { getProjects,getAllProjects as getProjs } from './projects'

export let auth = null;
async function setCurrentUser(user,uid){
    const dispatch = store.dispatch
    const currentUser = store.getState().currentUser.user
    dispatch(setUser( currentUser ? {...currentUser,...user} : user))

    // Set projects
    dispatch(setProjects(await getProjects(uid)))
    dispatch(setAllProjects(await getProjs()))
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
    let email = nemail ? nemail : "mboyakgilbert@gmail.com"
    let password = npassword ? npassword : "gilbert123"

    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });

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
            console.log('User SignedOut')
          }
    });
    return {auth}
}