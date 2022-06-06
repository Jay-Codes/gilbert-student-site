import React,{useEffect} from 'react'
import {Close ,Check} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'   

const TrueFalse = ({flag})=>(
    flag ? <Check className=' text-green-500'/> :
         flag ===null ? <span className='rounded-xl bg-red-400 text-red-800 p-[.25rem]'>pending</span> :
          <Close className='text-red-500'/>
)
const ProjectsMini = () => {
    const { projects } = useSelector(state=>state.projectState)
  return (
    <div className='flex-[2] overflow-y-auto m-[.5rem] ml-[.25rem] rounded-lg bg-white capitalize mt-0  pt-[1.7rem] pl-[1.5rem] pb-[1.7rem]  pr-[1.5rem]'>
        <h1 className=' font-bold uppercase text-left mt-[.25rem] mb-[1rem]'>Projects</h1>
        <table className='capitalize text-left border-collapse w-[100%]'>
            <thead>
                <tr className='mb-[.5rem] border-b-[1px] border-b-gray-300'>
                    <th className='pb-[.5rem]'>Project Name</th>
                    <th className='pl-[2rem] pb-[.5rem] text-center'>instructor approved</th>
                    <th className='pl-[2rem] pb-[.5rem] text-center'>investor approved</th>
                </tr> 
            </thead>
            <tbody>
               {projects.map((project,index)=>(
                    <tr key={index} className=' border-b-[1px] border-b-gray-300 cursor-pointer hover:bg-[#b0b0b0] rounded-lg'>
                        <td className='pb-[.5rem]  pt-[.5rem]'>{project.projectName}</td>
                        <td className='text-center pl-[2rem] pb-[.5rem] pt-[.5rem]'><TrueFalse flag={project.evaluator}/></td>
                        <td className='text-center pl-[2rem] pb-[.5rem] pt-[.5rem]'><TrueFalse flag={project.investor}/></td>
                    </tr>
                ))} 
                
            </tbody>
            <tfoot>
                <Link to='/submission'>
                    {projects.length === 0 && <h1>Go to  Submissions page To submit A project</h1>}
                </Link>    
            </tfoot>
            
            
        </table>

    </div>
  )
}

export default ProjectsMini