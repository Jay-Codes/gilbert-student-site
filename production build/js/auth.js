import  { getAuth,onAuthStateChanged, createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut, sendPasswordResetEmail }  from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js'
import { getFirestore, collection, addDoc,  doc, setDoc,query,where,getDoc } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
window.links = {
    STUDENT : '/student/index.html',
    EVALUATOR : '/evaluator/index.html',
    INVESTOR : '/investor/index.html'
    // STUDENT : '/builds/index.html',
    // EVALUATOR : '/builds/index.html',
    // INVESTOR : '/builds/index.html'
}
 
const db = getFirestore(window.app);
const auth = getAuth();

const citiesRef = collection(db, "cities");
const usersRef = collection(db, "users");




onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    window.uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

async function writeNewUserToDB(firstName,lastName,phone,userType,email,uid){
    try {
        await setDoc(doc(usersRef, uid), {
          firstname: firstName,
          lastname: lastName,
          phone: phone,
          userType:userType,
          email:email,
        });
        
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
window.passwordReset = function passwrodReset(){
    const email = document.getElementById('email').value;
    sendPasswordResetEmail(auth, email)
    .then(() => {
        // Password reset email sent!
        // ..
        alert('Succesfuly sent pasword reset email \nKindly check your emails')
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage+"\nError code " + errorCode)
        // ..
    });
}
window.signIn = function signIn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    sessionStorage.setItem('projectAppEmail',email)
    sessionStorage.setItem('projectAppPassword',password)
    console.log(password)
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid
        const ref = doc(db,'users',uid)
        const userSnap = await getDoc(ref);

        if (userSnap.exists()) {
            const user = userSnap.data();
            const ut = user.userType
            if(ut === 'Student')
                window.location.href = window.links.STUDENT
            else if (ut === 'Evaluator')
                window.location.href = window.links.EVALUATOR
            else if (ut === 'Investor')
                window.location.href = window.links.INVESTOR
        } else {
            console.log("No such document!");
        }
        console.log('login done')
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        alert('wrong password \nPlease Enter The Correct Password')
        const passwordField = document.getElementById('password');
        passwordField.value=''
        passwordField.focus()
        
    });
}
window.signUp = function signUp(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const userType = document.getElementById('userType').value

    sessionStorage.setItem('projectAppEmail',email)
    sessionStorage.setItem('projectAppPassword',password)

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        await writeNewUserToDB(firstName,lastName,phone,userType,email,user.uid)

        if (userType === 'Student')
            window.location.href = window.links.STUDENT
        else if(userType === 'Evaluator')
            window.location.href = window.links.EVALUATOR
        else if(userType === 'Investor')
            window.location.href = window.links.INVESTOR
        // window.location.href = 
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
    });
}
window.signOut = function signOut(){
    localStorage.clear()
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}