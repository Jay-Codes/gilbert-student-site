import React,{useState} from 'react'
import {Close ,Check} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'   
import { db } from '../lib'
import {doc , getDoc} from 'firebase/firestore'
import { useEffect } from 'react'

const TrueFalse = ({flag})=>(
    flag !=null  ?  (flag === false ? <Close className='text-red-500'/> : <Check className=' text-green-500'/>) :
        <span className='rounded-xl bg-red-400 text-red-800 p-[.25rem]'>pending</span> 
          
)
const Investor = ({children,flag,project})=>{
    const [visible,setVisible] = useState(false)
    const [investor,setInvestor] = useState(null)

    useEffect(()=>{
        (async ()=>{
            const docRef = doc(db,'users',project.investor)
            const snapShot = await getDoc(docRef)
            setInvestor(snapShot.data())
            console.log(snapShot.data())
        })()
    },[visible])
    return (<div className='relative' onMouseOver={e=>setVisible(true)}  onMouseOut ={e=>setVisible(false)}>
        {children}
        {
            flag!= null && visible && investor != null &&
            <div className='w-[420px] h-[fit-content] absolute top-[-10px] right-[200px] z-[999]  shadow-md bg-white rounded-md  text-left px-[15px] py-[10px]'>
                <span>investor name &nbsp;: {investor.firstname+" "+investor.lastname}<br/></span>
                <span>investor email&nbsp;&nbsp;&nbsp;: <span className='lowercase'> {investor.email}</span><br/></span>
                <span>investor phone&nbsp;: {investor.phone}</span>
            </div>
        }
    </div>)
}
const ProjectsMini = () => {
    const { projects } = useSelector(state=>state.projectState)
  return (
    <div className='flex-[2] overflow-y-auto m-[.5rem] ml-[.25rem] rounded-lg bg-white capitalize mt-0  pt-[1.7rem] pl-[1.5rem] pb-[1.7rem]  pr-[1.5rem] h-[340px]'>
        <h1 className=' font-bold uppercase text-left mt-[.25rem] mb-[1rem]'>Projects</h1>
        <table className='capitalize text-left border-collapse w-[100%] overflow-y-auto'>
            <thead>
                <tr className='mb-[.5rem] border-b-[1px] border-b-gray-300'>
                    <th className='pb-[.5rem]'>Project Name</th>
                    <th className='pl-[2rem] pb-[.5rem] text-center'>instructor approved</th>
                    <th className='pl-[2rem] pb-[.5rem] text-center'>investor approved</th>
                </tr> 
            </thead>
                <tbody >
                {projects.map((project,index)=>(
                        <tr key={index} className=' border-b-[1px] border-b-gray-300 cursor-pointer hover:bg-[#b0b0b0] rounded-lg'>
                            <td className='pb-[.5rem]  pt-[.5rem]'>{project.projectName}</td>
                            <td className='text-center pl-[2rem] pb-[.5rem] pt-[.5rem]'><TrueFalse flag={project.evaluator}/></td>
                            <td className='text-center pl-[2rem] pb-[.5rem] pt-[.5rem]'><Investor project={project} flag={project.investor}><TrueFalse flag={project.investor}/></Investor></td>
                        </tr>
                    ))} 
                    
                </tbody>
            <tfoot>
                <Link to='/student/submission'>
                    {projects.length === 0 && <h1>Go to  Submissions page To submit A project</h1>}
                </Link>    
            </tfoot>
            
            
        </table>

    </div>
  )
}

export default ProjectsMini