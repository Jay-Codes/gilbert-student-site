import { doc ,updateDoc} from 'firebase/firestore'
import { updateEmail ,updatePassword } from 'firebase/auth'
import { db } from '.'
import { auth } from './auth'

export async function updateProfileInfo(data,password,user,email){
    const docRef =  doc(db,'users',user.uid)
    await updateDoc(docRef,{
        ...data
    })

    if(email)
        updateEmail(auth.currentUser, data.email).then(() => {
            // Email updated!
            sessionStorage.setItem('projectAppEmail',email)
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    if(password)
        updatePassword(user, password).then(() => {
            // Update successful.
            sessionStorage.setItem('projectAppPassword',password)
        }).catch((error) => {
            // An error ocurred
            // ...
        });
}