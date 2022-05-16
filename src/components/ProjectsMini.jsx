import React from 'react'
import {Close ,Check} from '@mui/icons-material'

const data= [
    {name:'ordering system',instructor:true , investor : true},
    {name:'app',instructor:true , investor : false},
    {name:'webstie',instructor:null , investor : null},
    {name:'water system',instructor:false , investor : null},
]
const TrueFalse = ({flag})=>(
    flag ? <Check className=' text-green-500'/> :
         flag ===null ? <span className='rounded-xl bg-red-400 text-red-800 p-[.25rem]'>pending</span> :
          <Close className='text-red-500'/>
)
const ProjectsMini = () => {
  return (
    <div className='flex-[2] m-[.5rem] ml-[.25rem] rounded-lg bg-white capitalize   pt-[1.7rem] pl-[1.5rem] pb-[1.7rem]  pr-[1.5rem]'>
        <h1 className=' font-bold uppercase text-left mt-[.25rem] mb-[1rem]'>Projects</h1>
        <table className='capitalize text-left border-collapse w-[100%]'>
            <tr className='mb-[.5rem] border-b-[1px] border-b-gray-300'>
                <th className='pb-[.5rem]'>Project Name</th>
                <th className='pl-[2rem] pb-[.5rem] text-center'>instructor approved</th>
                <th className='pl-[2rem] pb-[.5rem] text-center'>investor approved</th>
            </tr>
            {data.map((project,key)=>(
                <tr index={key} className=' border-b-[1px] border-b-gray-300 cursor-pointer hover:bg-[#b0b0b0] rounded-lg'>
                    <td className='pb-[.5rem]  pt-[.5rem]'>{project.name}</td>
                    <td className='text-center pl-[2rem] pb-[.5rem] pt-[.5rem]'><TrueFalse flag={project.instructor}/></td>
                    <td className='text-center pl-[2rem] pb-[.5rem] pt-[.5rem]'><TrueFalse flag={project.investor}/></td>
                </tr>
            ))}
        </table>
    </div>
  )
}

export default ProjectsMini