import { db } from '.'
import { doc, setDoc ,addDoc ,collection, where, query,getDocs,updateDoc} from "firebase/firestore"; 
import { store } from '../redux/store'


export async function handleInvestInProject(project,flag){
    const projectRef = doc(db,'projects',project.id)
    const { user } =  store.getState().currentUser
    await updateDoc(projectRef,{
        investor : flag ? user.uid : null
    })
}

export async function publishProject(name,category,description,uid){
    const projectRef = collection(db, "projects")
    // {projectName:'ordering system',instructor:true , investor : true ,comments:'Good project check on your execution'},
    await addDoc(projectRef, {
        projectName :name,
        category:category,
        description:description,
        studentId : uid,
        instructor:null,
        evaluator:null,
    });    
    window.location ='/'
}

export async function handleApproveProject(approved,comment,project){
    const docRef = doc(db,'projects',project.id)
    const { user } = store.getState().currentUser
    await updateDoc( docRef,
        {
            evaluator : approved ? user.uid : null,
            comment : comment,
            evaluatorName : user.firstname +" " + user.lastname,
        }
    )
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
    querySnapShot.forEach((doc)=>{projects.push({id:doc.id,...doc.data()})})
    return projects
}
