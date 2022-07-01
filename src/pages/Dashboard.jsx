import React,{useEffect, useState} from 'react'
import {Close ,Check} from '@mui/icons-material'
import { useSelector} from 'react-redux'
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



export const Modal = ({children})=>(
    <div className='bg-[rgba(0,0,0,0.5)] absolute bottom-[-6rem] left-0 right-0 top-0 flex flex-col justify-center items-center z-[10] '>
        {children}
    </div>
)
export const Dashboard = () => {
    const [ category ,setCategory ] = useState('all')
    const [ approvedFilter , setApprovedFilter ] = useState(false)
    const [ investorApprovedFilter , setInvestorApprovedFilter ] = useState(false)
    const [ currentProjectInContext , setCurrentProjectInContext] = useState(null)
    const { allProjects :projects} =  useSelector(state=>state.projectState)
    data = projects
    const rowStyle = 'px-[1.5rem] my-[.25rem] capitalize'
    let list = data.filter((item)=> category !=='all' ? item.category === category : true)
    list = list.filter(item=> { return approvedFilter ? item.evaluator : true} )
    list =  list.filter(item=> investorApprovedFilter ? item.hasInvestor :true)
    useEffect(()=>{
        if(projects) data = projects
    },[])
  return (
    <div className=' p-[2rem] rounded-xl bg-white flex flex-col w-[100%] min-h-[100vh]'>
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
                <thead>
                    <tr>
                        <th className={rowStyle}>project name</th>
                        <th className={rowStyle}>Category</th>
                        <th className={rowStyle}>student</th>
                        <th className={rowStyle}>approved</th>
                        <th className={rowStyle}>has investor</th>
                    </tr>    
                </thead>
                
                <tbody>
                    {list.map((project,index)=>(
                        <tr key={index} className='border-b-[1px]  hover:bg-neutral-50 cursor-pointer' >
                                <td onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.projectName}</div></td>
                                <td onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.category}</div></td>
                                <td onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}>{project.studentName}</div></td>
                                <td onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}><TrueFalse flag={project.evaluator}/></div></td>
                                <td onClick={e=>{setCurrentProjectInContext(project)}} ><div className={rowStyle}><TrueFalse flag={project.investor}/></div></td>
                        </tr>
                    ))}    
                </tbody>
                
            </table>
        </div>

        {currentProjectInContext && 
            <Modal>
                <div className='rounded-xl bg-white flex flex-col justify-start p-[1rem]  text-left'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-[1rem] uppercase font-bold'>{currentProjectInContext.projectName}</h1>
                        <button className=' hover:bg-neutral-50 rounded-xl p-[.25rem]' onClick={e=>{setCurrentProjectInContext(null)}}><Close/></button>
                    </div>
                    <div className='flex flex-col'>
                        <span> Project Name: {currentProjectInContext.projectName}</span>
                        <span> Project category: {currentProjectInContext.category}</span>
                        <span> Student Name: {currentProjectInContext.studentName}</span>
                        {   currentProjectInContext.url &&
                            <a className='w-[fit-content] mb-[5px] rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-[.5rem]' target='blank' href={currentProjectInContext.url}> View Project Documents </a>
                        }
                        <div className='p-[1rem] border w-[1000px] h-[500px] overflow-y-auto'>
                            <Desc description = {currentProjectInContext.description}/>
                        </div>
                    </div>
                </div>
            </Modal>
        } 
    </div>
  )
}

export const Desc = ({description})=>(<p className='description ' dangerouslySetInnerHTML={{__html:description}}></p>)

export default Dashboard