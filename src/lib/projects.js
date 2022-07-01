import { db } from '.'
import { doc, setDoc ,addDoc ,collection, where, query,getDocs} from "firebase/firestore"; 
import { Category } from '@mui/icons-material';
import { store } from '../redux/store';


export async function publishProject(name,category,description,uid,url){
    const projectRef = collection(db, "projects")
    // {projectName:'ordering system',instructor:true , investor : true ,comments:'Good project check on your execution'},
    const { user } = store.getState().currentUser
    
    await addDoc(projectRef, {
        projectName :name,
        category:category,
        description:description,
        studentId : uid,
        investor:null,
        evaluator:null,
        studentName : user.firstname+ " "+ user.lastname,
        url:url,
    });    
    window.location.href ='/student/'
}

export async function getProjects(uid){
    const projectRef = collection(db, "projects")
    const q = query(projectRef,where('studentId','==',uid))
    const querySnapShot = await getDocs(q)
    const projects = []
    querySnapShot.forEach((doc)=>{
        const data = doc.data()
        projects.push({id:doc.id,...data})
    })
    return projects
}

export async function getAllProjects(){
    const projectRef = collection(db,'projects')
    const q = query(projectRef)
    const querySnapShot = await getDocs(q)
    const projects = []
    querySnapShot.forEach((doc)=>{projects.push(doc.data())})
    return projects
}
