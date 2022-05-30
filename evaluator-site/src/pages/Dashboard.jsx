import React,{useEffect, useState} from 'react'
import { Close } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentProject } from '../redux/ProjectReducer'
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

export const ActionButtons = ({project,actions})=>{
    const dispatch = useDispatch()
    return(
        <div className='mt-[.5rem] z-[12]'>
            <button className=' rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-[.5rem]' onClick={e=>actions.showApproveDialog(true)}> Approve </button>
            <button className=' ml-[.5rem] hover:bg-red-700 rounded-lg bg-red-600 text-white p-[.5rem]'  onClick={e=>actions.showDisapproveDialog(true)}> Disapprove </button>
            <button className=' ml-[.5rem] hover:bg-neutral-200 rounded-lg p-[.5rem] p-[.5rem]text-blue-600' onClick={e=>{dispatch(setCurrentProject(project))}}> Chat With Student </button>
        </div>
    )
}

export const Modal = ({children})=>(
    <div className='bg-[rgba(0,0,0,0.5)] absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-center items-center '>
        {children}
    </div>
)
export const Dashboard = () => {
    const [ category ,setCategory ] = useState('all')
    const [ approvedFilter , setApprovedFilter ] = useState(false)
    const [ investorApprovedFilter , setInvestorApprovedFilter ] = useState(false)
    const [ currentProjectInContext , setCurrentProjectInContext] = useState(null)
    const [ approveDialog,showApproveDialog ] =useState(false)
    const [ disapproveDialog,showDisapproveDialog ] = useState(false)
    const { projects , currentProject } =  useSelector(state=>state.projectReducer)
    data = projects
    const rowStyle = 'px-[1.5rem] my-[.25rem] capitalize'
    let list = data.filter((item)=> category !=='all' ? item.category === category : true)
    list = list.filter(item=> { return approvedFilter ? item.approved : true} )
    list =  list.filter(item=> investorApprovedFilter ? item.hasInvestor :true)
    useEffect(()=>{
        if(projects) data = projects
    },[])

    useEffect(()=>{
        if (!currentProject)return
        console.log(currentProject)
        window.location='/chat'
    },[currentProject])
    function handleApproveProject (e){
        showApproveDialog(false)
    }
    function handleDisapproveProject(e){
        showDisapproveDialog(false)
    }
    
  return (
    <div className='flex-[5] p-[2rem] rounded-xl bg-white flex flex-col w-[100%] h-[100vh]'>
        <div className='px-[1.5rem] flex'>
            <div className='flex flex-col flex-1'>
                <span className='font-[300] text-neutral-400 capitalize mt-[1rem] text-[.8rem] mb-[-.1rem] '>filter by : category</span>
                <select className='cursor-pointer' value={category} onChange={e=>setCategory(e.target.value)}>
                    <option label='all' value='all'/>
                    <option label='Health Care' value='Health Care'/>
                    <option label='Education Quality' value='Education'/>
                    <option label='Corruption' value='Corruption'/>
                    <option label='Food Insecurity' value='Food Insecurity'/>
                    <option label='Economy' value='Economy'/>
                    <option label='Other' value='other'/>
                </select>    
            </div>  
            <div  className='flex flex-col flex-1'>
                <span className='font-[300] text-neutral-400 capitalize mt-[1rem] text-[.8rem] mb-[-.1rem] '>filter by approved projects</span>
                <select className='cursor-pointer' onChange={e=>setApprovedFilter(e.target.value === 'true' ? false :true)}>
                    <option label='all' value={true}/>
                    <option label='Approved Projects' value={false}/>
                </select>   
            </div>
            <div className='flex flex-col flex-1'>
                <span className='font-[300] text-neutral-400 capitalize mt-[1rem] text-[.8rem] mb-[-.1rem] '>filter by investor</span>
                <select className='cursor-pointer'  onChange={e=>setInvestorApprovedFilter(e.target.value === 'true' ? false :true)}>
                    <option label='all' value={true}/>
                    <option label='With Investor' value={false}/>
                </select>    
            </div>
            
        </div>
        

        <div>
            <table className=' border-collapse '>
                <tr>
                    <th className={rowStyle}>project name</th>
                    <th className={rowStyle}>Category</th>
                    <th className={rowStyle}>student</th>
                    <th className={rowStyle}>approved</th>
                    <th className={rowStyle}>has investor</th>
                    <th className={rowStyle}>actions</th>
                </tr>

                {list.map((project,index)=>(
                    <tr className='border-b-[1px]  hover:bg-neutral-50 cursor-pointer' >
                            <td key={index} onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.projectName}</div></td>
                            <td key={index} onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.category}</div></td>
                            <td key={index} onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.studentName}</div></td>
                            <td key={index} onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}>{String(project.approved)}</div></td>
                            <td key={index} onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}>{String(project.hasInvestor)}</div></td>
                            <td key={index} ><div className={rowStyle}><ActionButtons project={project} actions = {{showApproveDialog,showDisapproveDialog}}/></div></td>
                    </tr>
                ))}
            </table>
        </div>

        {currentProjectInContext && 
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
                        <div className='p-[1rem] border w-[1000px] h-[500px] overflow-y-auto'>
                            <Desc description = {currentProjectInContext.description}/>
                        </div>
                    </div>
                    <div className='mt-[.5rem]'>
                        <button className=' rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-[.5rem]' onClick={e=>showApproveDialog(true)}> Approve </button>
                        <button className=' ml-[.5rem] hover:bg-red-700 rounded-lg bg-red-600 text-white p-[.5rem]' onClick={e=>showDisapproveDialog(true)}> Disapprove </button>
                        <button className=' ml-[.5rem] hover:bg-neutral-200 rounded-lg p-[.5rem] p-[.5rem]text-blue-600' > Chat With Student </button>
                    </div>
                </div>
            </Modal>
        } 
        {approveDialog &&
            <Modal>
                <div className='rounded-xl bg-white flex flex-col justify-start p-[1rem]'>
                    <span className='capitalize'> You are Currently Approving this Project and Taking on the role of the projects evaluator</span>
                    <span className='capitalize'> Are You Sure You want to Proceed ?</span>
                    <div >
                        <button className='bg-blue-600 text-white hover:bg-blue-700 rounded-xl p-[.5rem] ' onClick={handleApproveProject}>
                            Yes
                        </button>
                        <button className='bg-red-600 text-white hover:bg-red-700 rounded-xl p-[.5rem] ml-[.5rem]' onClick={e=>showApproveDialog(false)}>
                            cancel
                        </button>
                    </div>
                </div>
            </Modal>
        }
        {disapproveDialog &&
            <Modal>
                <div className='rounded-xl bg-white flex flex-col justify-start p-[1rem]'>
                    <span className='capitalize'> you are about to disapprove this students Project</span>
                    <span className='capitalize'> Are You Sure You want to Proceed ?</span>

                    <textarea
                        // value={}
                        // onChange={}
                        className='border-neutral-400 border my-[.4rem] p-[.3rem]'
                        placeholder='Enter Reason of Disapproval'
                        rows={5}
                        cols={5}
                    />
                    <div >
                        <button className='bg-blue-600 text-white hover:bg-blue-700 rounded-xl p-[.5rem] ' onClick={handleDisapproveProject}>
                            Yes
                        </button>
                        <button className='bg-red-600 text-white hover:bg-red-700 rounded-xl p-[.5rem] ml-[.5rem]' onClick={e=>showDisapproveDialog(false)}>
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