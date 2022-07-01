import React,{useEffect, useState} from 'react'
import {Close ,Check} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentProject } from '../redux/ProjectReducer'
import { handleApproveProject as persistedHandleApproveProject } from '../lib/projects'
import { useNavigate } from 'react-router-dom'
import { getStudentFromProject} from '../lib/students'
import { handleInvestInProject } from '../lib/invest'
import { getAllProjects } from '../lib/projects'
let data = [
    {
        projectName :'water project',
        category : 'Health Care',
        studentName :  'Jay',
        description : '<h1 class="text-[2rem]"><b>a powerful way to live life</b></h1>',
        approved : false,
        hasInvestor : false
    },
    {
        projectName :'water project',
        category : 'Health Care',
        studentName :  'Jay',
        description : '<h1 class="text-[2rem]"><b>a powerful way to live life sdasdw sdadw dasd sdad sasdw dasdw sdada</b></h1>',
        approved : true,
        hasInvestor : false
    },
    {
        projectName :'water project',
        category : 'Corruption',
        studentName :  'Jay',
        description : '<h1><b>a powerful way to live life</b></h1><span>hello world</span>',
        approved : true,
        hasInvestor : false
    },
]

const TrueFalse = ({flag})=>(
    flag ? <Check className=' text-green-500'/> :
         flag ===null ? <span className='rounded-xl bg-red-400 text-red-800 p-[.25rem]'>pending</span> :
          <Close className='text-red-500'/>
)

function useRefresh(){
    const [ count ,setCount] = useState(0)
    return setCount
}

export const ActionButtons = ({project,actions})=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleChatWithStudent(e){
        dispatch(setCurrentProject(project));
        await getStudentFromProject(project)
        navigate('/investor/chat')
    }
    return(
        <div className='mt-[.5rem] z-[12] flex items-center justify-center' >
            {!project.investor ? <button className=' rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-[.5rem]' onClick={e=>actions.showApproveDialog(true,project)}> Invest </button>:
            <button className=' ml-[.5rem] hover:bg-red-700 rounded-lg bg-red-600 text-white p-[.5rem]'  onClick={e=>actions.showDisapproveDialog(true,project)}> Uninvest </button>}
        </div>
    )
}

export const Modal = ({children})=>(
    <div className='z-[6] bg-[rgba(0,0,0,0.5)] absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-center items-center '>
        {children}
    </div>
)
export const Dashboard = () => {
    const [ category ,setCategory ] = useState('all')
    const [ currentProjectInContext , setCurrentProjectInContext] = useState(null)
    const [ investDialog,showInvestDialog ] =useState(false)
    const [ uninvestDialog,showUninvestDialog ] = useState(false)
    const { projects , currentProject } =  useSelector(state=>state.projectReducer)
    const [ currProject ,setCurrProject ] = useState()
    const [ currStudent,setCurrStudent ] = useState() 
    const { user } = useSelector(state=>state.currentUser)
    const refresh = useRefresh()
    console.log(currStudent)
    data = projects
    const rowStyle = 'px-[1.5rem] my-[.25rem] capitalize'
    let list = data.filter((item)=> category !=='all' ? item.category === category : true)
    list = list.filter(item=>  (item.evaluator ) )
    list =  list.filter(item=> item.investor ?  (item.investor === user.uid ? true : false ) : true)
    useEffect(()=>{
        if(projects) data = projects
    },[])
    useEffect( ()=>{
        (async()=>{
            const stud = await getStudentFromProject(currentProjectInContext)
            if (stud)
                setCurrStudent(stud)
        })()
    },[currentProjectInContext])
    async function handleApproveProject (e){
        await handleInvestInProject(currProject,true)
        showInvestDialog(false)
        await getAllProjects()
        
    }
    async function handleDisapproveProject(e){
        await handleInvestInProject(currProject,false)
        showUninvestDialog(false)
        await getAllProjects()
        
    }

    function handleShowApproveDialog(visibility,proj){
        setCurrProject(proj)
        showInvestDialog(visibility)
    }
    function handleShowDispproveDialog(visibility,proj){
        setCurrProject(proj)
        showUninvestDialog(visibility)
    }

    async function handleSetCurrentProjectInContext(project){
        setCurrentProjectInContext(project)
        const stud = await getStudentFromProject(project)
        if(stud)
            setCurrStudent(stud)
    }
  return (
    <div className='flex-[5] p-[2r em] rounded-xl bg-white flex flex-col w-[100%] h-[100vh]'>
        <div className='px-[1.5rem] flex'>
            <div className='flex flex-col flex-1'>
                <span className='font-[300] text-neutral-400 capitalize mt-[1rem] text-[.8rem] mb-[-.1rem] '>filter by : category</span>
                <select className='cursor-pointer' value={category} onChange={e=>setCategory(e.target.value)}>
                    <option label='all' value='all'/>
                    <option label='Health Care' value='Health Care'/>
                    <option label='Education Quality' value='Education Quality'/>
                    <option label='Corruption' value='Corruption'/>
                    <option label='Food Insecurity' value='Food Insecurity'/>
                    <option label='Economy' value='Economy'/>
                    <option label='Other' value='other'/>
                </select>    
            </div>  
           
            
        </div>
        

        <div className='h-[600px] overflow-y-auto relative'>
            <table className=' border-collapse max-h-[400px] overflow-y-auto' style={{ 
            }}>
                {/* <div className='h-[600px] overflow-y-auto relative'> */}
                    <thead>
                        <tr className='sticky top-0 bg-white'>
                            <th className={rowStyle}>project name</th>
                            <th className={rowStyle}>Category</th>
                            <th className={rowStyle}>student</th>
                            <th className={rowStyle}>actions</th>
                        </tr>    
                    </thead>
                
                
                    <tbody >
                        {list.map((project,index)=>(
                            <tr key={index} className='border-b-[1px]  hover:bg-neutral-50 cursor-pointer' >
                                    <td onClick={e=>{handleSetCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.projectName}</div></td>
                                    <td onClick={e=>{handleSetCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.category}</div></td>
                                    <td onClick={e=>{handleSetCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.studentName}</div></td>
                                    <td ><div className={rowStyle}><ActionButtons project={project} actions = {{showApproveDialog : handleShowApproveDialog,showDisapproveDialog :handleShowDispproveDialog}}/></div></td>
                            </tr>
                        ))}    
                    </tbody>
                {/* </div> */}
                
            </table>
        </div>

        {currentProjectInContext && currStudent && 
            <Modal>
                <div className='rounded-xl bg-white flex flex-col justify-start p-[1rem]'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-[1rem] uppercase font-bold'>{currentProjectInContext.projectName}</h1>
                        <button className=' hover:bg-neutral-50 rounded-xl p-[.25rem]' onClick={e=>{setCurrentProjectInContext(null)}}><Close/></button>
                    </div>
                    <div className='flex flex-col'>
                        <span> Project Name: {currentProjectInContext.projectName}</span>
                        <span> Project category: {currentProjectInContext.category}</span>
                        <span> Student Name: {currentProjectInContext.studentName}</span>
                        <span> Student Email: {currStudent.email}</span>
                        <span> Student Phone: {currStudent.phone}</span>
                        {   currentProjectInContext.url &&
                            <a className='w-[fit-content] mb-[5px] rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-[.5rem]' target='blank' href={currentProjectInContext.url}> View Project Documents </a>
                        }
                        <div className='p-[1rem] border w-[1000px] h-[500px] overflow-y-auto'>
                            <Desc description = {currentProjectInContext.description}/>
                        </div>
                    </div>
                    <div className='mt-[.5rem]'>
                        <button className=' rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-[.5rem]' onClick={e=>showInvestDialog(true)}> Invest </button>
                        <button className=' ml-[.5rem] hover:bg-red-700 rounded-lg bg-red-600 text-white p-[.5rem]' onClick={e=>showUninvestDialog(true)}> Uninvest </button>
                    </div>
                </div>
            </Modal>
        } 
        {investDialog &&
            <Modal>
                <div className='rounded-xl bg-white flex flex-col justify-start p-[1rem]'>
                    <span className='capitalize'> You are Currently Investing in this project this means that you are taking on the role of the Projects Investor</span>
                    <span className='capitalize'> Ivesting reveals your contact information to the student for futher discussions</span>
                    <span className='capitalize'> Are You Sure You want to Proceed ?</span>

                    {/* <textarea
                        // value={}
                        // onChange={}
                        className='border-neutral-400 border my-[.4rem] p-[.3rem]'
                        placeholder='Enter Your Comments on This Project'
                        rows={5}
                        cols={5}
                        id = 'comment'
                    /> */}

                    <div >
                        <button className='bg-blue-600 text-white hover:bg-blue-700 rounded-xl p-[.5rem] ' onClick={handleApproveProject}>
                            Yes
                        </button>
                        <button className='bg-red-600 text-white hover:bg-red-700 rounded-xl p-[.5rem] ml-[.5rem]' onClick={e=>showInvestDialog(false)}>
                            cancel
                        </button>
                    </div>
                </div>
            </Modal>
        }
        {uninvestDialog &&
            <Modal>
                <div className='rounded-xl bg-white flex flex-col justify-start p-[1rem]'>
                    <span className='capitalize'> you are about to uninvest from this students Project</span>
                    <span className='capitalize'> Are You Sure You want to Proceed ?</span>
                    <span className='capitalize'> Ivesting reveals your contact information to the student for futher discussions</span>
                    <div >
                        <button className='bg-blue-600 text-white hover:bg-blue-700 rounded-xl p-[.5rem] ' onClick={handleDisapproveProject}>
                            Yes
                        </button>
                        <button className='bg-red-600 text-white hover:bg-red-700 rounded-xl p-[.5rem] ml-[.5rem]' onClick={e=>showUninvestDialog(false)}>
                            cancel
                        </button>
                    </div>
                </div>
            </Modal>
        }
    </div>
  )
}

export const Desc = ({description})=>(<p className='description' dangerouslySetInnerHTML={{__html:description}}></p>)

export default Dashboard