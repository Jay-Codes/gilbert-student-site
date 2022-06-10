import { db } from '.'
import { doc, setDoc ,addDoc ,collection, where, query,getDoc,updateDoc} from "firebase/firestore"; 
import { store } from '../redux/store'
import { setCurrentStudent } from '../redux/currentStudentState';
export async function getStudentFromProject(project){
    if (project!=null){
        const studentRef = doc(db,'users',project.studentId)
        const docSnap =  await getDoc(studentRef)
        const dispatch = store.dispatch

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            // dispatch(setCurrentStudent(docSnap.data()))
            return {uid:docSnap.id,...docSnap.data()}
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        } 
    }
}