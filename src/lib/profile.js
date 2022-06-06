import { doc ,updateDoc} from 'firebase/firestore'
import { updateEmail ,updatePassword } from 'firebase/auth'
import { db } from '.'
import { auth } from './auth'

export async function updateProfileInfo(data,password,user){
    const docRef =  doc(db,'users',user.uid)
    await updateDoc(docRef,{
        ...data
    })

    if(password) console.log(password)
    // updateEmail(auth.currentUser, data.email).then(() => {
    //     // Email updated!
    //     // ...
    //   }).catch((error) => {
    //     // An error occurred
    //     // ...
    //   });
    // updatePassword(user, password).then(() => {
    //     // Update successful.
    //   }).catch((error) => {
    //     // An error ocurred
    //     // ...
    //   });
}